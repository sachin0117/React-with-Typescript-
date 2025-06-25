import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../features/Interceptor"
import Navbar from "../header/Navbar"
import { redirect, useLoaderData } from "react-router-dom";
import { Card, Row, Typography, Col, Image, Button, Empty, Spin } from "antd";
import type { ProductData } from "./ProductInterface"
import "./Dashboard.css"
import { PlusOutlined } from "@ant-design/icons";
import { addToCart } from "../../store/CartSlice";
import { useDispatch } from "react-redux";

const { Title, Paragraph, Text } = Typography

export default function Dashboard() {
  const [data, setData] = useState<ProductData[]>([])
  const [filterData, setfilterData] = useState<ProductData[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/products');
        if (res.status === 200) {
          // console.log(res.data);
          setData(res.data);
          setfilterData(res.data)
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setfilterData(data);
    } else {
      const filtered = data.filter(
        (item) => item.category?.slug === selectedCategory
      );
      setfilterData(filtered);
    }
  }, [selectedCategory, data]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
    if (!value) {
      setfilterData(data);
    } else {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setfilterData(filtered);
    }
  }, [data]);

  const handleCartData = useCallback((product: ProductData) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  const user = useLoaderData()

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text style={{ fontSize: "24px" }}>Loading data...</Text>
          <Text style={{ fontSize: "24px" }}>Please wait a moment!</Text>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} onCategoryChange={handleCategoryChange} data={data} onSearch={handleSearch} />
      <div style={{ marginTop: "30px" }}>
        <Row gutter={[20, 24]} style={{ margin: 0, width: "100%", overflowX: "hidden", padding: "50px" }}>
          {
            filterData.length === 0 ? (
              <Col span={24}>
                <Empty description="No products found" />
              </Col>
            ) : (
              filterData.map((item) => (
                <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                  <Card hoverable
                    style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 400 }}
                    cover={
                      <Image
                        alt={item.title}
                        src={item.images[0]}
                        style={{ objectFit: "cover", margin: "0 auto", height: "300px", display: "block", background: "#f5f5f5", padding: 8, borderRadius: 20 }}
                        preview={false}
                      />}
                  >
                    <Title level={4} style={{ textAlign: "center", margin: 0 }}>
                      {item.title}
                    </Title>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 15 }}>
                      <Paragraph style={{ fontFamily: "cursive", fontWeight: "bold", fontSize: "18", margin: 0 }}>
                        Price: ${item.price}
                      </Paragraph>
                      <Button
                        onClick={() => handleCartData(item)}
                        style={{ background: "black", color: "white", borderRadius: "50px", fontWeight: 600, padding: "20px", textAlign: "center" }}>
                        <PlusOutlined />   Add to Cart
                      </Button>
                    </div>

                  </Card>
                </Col>
              ))
            )
          }
        </Row >
      </div>
    </>
  )
}


export const GetUserDetailloader = async () => {
  try {
    const response = await axiosInstance.get('/auth/profile');
    if (response.status === 200 || response.status === 201) {
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    // console.log(error)
    throw redirect('/')
  }
}