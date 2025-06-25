import { Header } from "antd/es/layout/layout";
import X from "../../assets/X.png";
import { LogoutOutlined, ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import { Tooltip, Typography, Row, Col, Avatar, Menu, AutoComplete, Badge, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { ProductData } from "../dashboard/ProductInterface";
import { RootState } from "../../store/Index";
import { useSelector } from "react-redux";
import UserDetail from "../../pages/userdetails/UserDetail";



type UserType = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

type NavbarProps = {
  user: UserType;
  onCategoryChange: (category: string) => void,
  data: ProductData[],
  onSearch: (value: string) => void;
};

const items = [
  { key: "all", label: "All" },
  { key: "clothes", label: "Clothes" },
  { key: "electronics", label: "Electronics" },
  { key: "furniture", label: "Furnitures" },
  { key: "shoes", label: "Shoes" },
];
const { Title } = Typography;

export default function Navbar({ user, onCategoryChange, data, onSearch }: NavbarProps) {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<{ value: string, label: React.ReactNode }[]>([]);
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleSearch = useCallback((value: string) => {
    if (!value) {
      setSearchData([]);
      onSearch("");
      return;
    }
    const filtered = data
      .filter((item) =>
        item.title
      )
      .map((item) => ({
        value: item.title,
        label: (
          <span>{item.title}</span>
        ),
      }));
    setSearchData(filtered);
    onSearch(value);
  }, [data, onSearch]);

  const handleLogout = useCallback(() => {
    navigate("/");
    sessionStorage.clear();
  }, [navigate]);

  const handleUserModalOpen = useCallback(() => setIsUserModalOpen(true), []);
  const handleUserModalClose = useCallback(() => setIsUserModalOpen(false), []);
  
  const handleMenuClick = useCallback((e: any) => {
    onCategoryChange(e.key);
  }, [onCategoryChange]);

  const handleCart = useCallback(() => {
    navigate("/cart");    
  }, [navigate]);


  return (
    <>
      <Header
        style={{
          background: "linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)",
          padding: "8px 24px",
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          minHeight: 80,
        }}
      >
        <Row align="middle" justify="space-between" style={{ flexWrap: "wrap" }}>
          <Col xs={24} md={16} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <img
              src={X}
              alt="logo"
              style={{
                height: 70,
                borderRadius: "50%",
                boxShadow: "10px 8px 12px rgba(0,0,0,0.06)"
              }}
            />
            <Title level={3} style={{ margin: 0, letterSpacing: 1, fontWeight: 700, whiteSpace: "nowrap" }}>
              Outfizz
            </Title>
            <Menu
              mode="horizontal"
              items={items}
              onClick={handleMenuClick}
              style={{
                flex: 1,
                minWidth: 0,
                marginLeft: 24,
                fontWeight: 600,
                border: "none",
                background: "transparent",
              }}
            />
            <AutoComplete
              popupMatchSelectWidth={300}
              style={{ width: 250, borderBottom: "1px solid black" }}
              placeholder="Search a product..."
              suffixIcon={<SearchOutlined />}
              variant="borderless"
              onSearch={handleSearch}
              options={searchData}
              onSelect={onSearch}
            >

            </AutoComplete>

          </Col>
          <Col xs={24} md={8}>
            <Row align="middle" justify="end" gutter={[25, 16]} style={{ flexWrap: "nowrap" }}>

              <div onClick={handleUserModalOpen}>
                {user && (

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      padding: "4px 12px 4px 8px",
                      borderRadius: 32,
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
                      transition: "box-shadow 0.3s",
                      gap: 12,
                    }}
                  >
                    <Avatar
                      src={user.avatar}
                      alt="avatar"
                      size={40}
                      style={{
                        border: "2px solid #333",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                      <span style={{ fontSize: 16, fontWeight: 600, color: "#111" }}>{user.name}</span>
                    </div>
                  </div>

                )}
              </div>

              <Col>
                <Badge count={cartItem.length}>
                  <Tooltip title="My Cart" placement="top">
                    <ShoppingCartOutlined
                      onClick={handleCart}
                      style={{
                        fontSize: 26,
                        color: "black",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Badge>
              </Col>
              <Col>
                <Tooltip title="Logout" placement="top">
                  <LogoutOutlined
                    onClick={handleLogout}
                    style={{
                      fontSize: 26,
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      <Modal
        open={isUserModalOpen}
        onCancel={handleUserModalClose}
        footer={null}
      >
        <UserDetail user={user} />
      </Modal>
    </>
  );
}
