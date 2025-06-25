import { Button, Image, Typography, Row, Col, Card,Space, Divider, Tooltip, } from "antd";
import { PlusOutlined, MinusOutlined, DeleteFilled,  } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Index";
import { CartItem, decreaseQuantity, increaseQuantity, removeFromCart, } from "../../store/CartSlice";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";

const { Title, Paragraph, Text } = Typography;

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <EmptyCart />
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price * item.quantity),
    0
  );
  const tax = 70;
  const total = subtotal + tax;

  const handleIncrease = (item: CartItem) => {
    dispatch(increaseQuantity(item.id));
  };
  const handleDecrease = (item: CartItem) => {
    dispatch(decreaseQuantity(item.id));
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Title
        level={1}
        style={{
          textAlign: "center",
          marginBottom: 10,
          fontWeight: 700,
          color: "#2c3e50",
        }}
      >
        Your Cart
      </Title>
      <Paragraph
        style={{
          textAlign: "center",
          marginBottom: 40,
          fontSize: 16,
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Review your selected items below before proceeding to checkout. Make sure
        everything looks good!
      </Paragraph>

      <Row
        gutter={[20, 24]}
        justify="center"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <Col xs={24} sm={24} md={16}>
          {cartItems.map((item: CartItem) => (
            <Card
              key={item.id}
              style={{
                marginBottom: 25,
                borderRadius: 12,
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                maxWidth: 700,
                marginLeft: "auto",
                marginRight: "auto",
                transition: "box-shadow 0.3s ease",
              }}
              hoverable
            >
              <Row gutter={16} align="middle">
                <Col xs={24} sm={8} md={6}>
                  <Image
                    alt={item.title}
                    src={item.images[0]}
                    preview={false}
                    style={{
                      width: "100%",
                      height: 140,
                      borderRadius: 10,
                      objectFit: "cover",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                </Col>
                <Col xs={24} sm={16} md={18}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Space
                      direction="vertical"
                      size="small"
                      style={{ width: "100%" }}
                    >
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          wordBreak: "break-word",
                          color: "#34495e",
                        }}
                      >
                        {item.title}
                      </Title>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          marginTop: 10,
                          color: "#27ae60",
                        }}
                      >
                        Price: ${(Number(item.price) * item.quantity).toFixed(2)}
                      </Text>
                    </Space>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 20,
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <Text
                        style={{ fontWeight: 500, marginRight: 10, color: "#34495e" }}
                      >
                        Quantity:
                      </Text>
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() => handleDecrease(item)}
                        size="small"
                        style={{
                          borderRadius: 6,
                          borderColor: "#8c52ff",
                          color: "#8c52ff",
                        }}
                      />
                      <Text
                        style={{
                          margin: "0 5px",
                          fontWeight: 600,
                          fontSize: "18px",
                          minWidth: 20,
                          textAlign: "center",
                          color: "#34495e",
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleIncrease(item)}
                        size="small"
                        style={{
                          borderRadius: 6,
                          borderColor: "#8c52ff",
                          color: "#8c52ff",
                        }}
                      />
                      <Tooltip title="Remove Item">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteFilled />}
                          onClick={() => dispatch(removeFromCart(item.id))}
                          style={{ marginLeft: "auto", fontSize: 20 }}
                        />
                      </Tooltip>

                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
        <Col xs={24} sm={24} md={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              maxWidth: 360,
              margin: "0 auto",
            }}
          >
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              }}
            >
              <Title level={4} style={{ color: "#2c3e50" }}>
                Summary
              </Title>
              <div
                style={{
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#34495e",
                }}
              >
                <Text style={{ fontSize: 16 }}>Subtotal:</Text>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  ${subtotal}
                </Text>
              </div>
              <div
                style={{
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#34495e",
                }}
              >
                <Text style={{ fontSize: 16 }}>Estimated Delivery and Handling:</Text>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>Free</Text>
              </div>
              <div
                style={{
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#34495e",
                }}
              >
                <Text style={{ fontSize: 16 }}>Estimated Taxes:</Text>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>${tax}</Text>
              </div>
              <Divider />
              <div
                style={{
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#2c3e50",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                <Text>Total:</Text>
                <Text>${total}</Text>
              </div>
              <Button
                type="primary"
                block
                size="large"
                style={{ borderRadius: 8, background: "#8c52ff", borderColor: "#8c52ff" }}
                onClick={() => alert("Proceed to checkout")}
              >
                Checkout
              </Button>
            </Card>
            <Button
              style={{
                cursor: "pointer",
                marginTop: 20,
                borderRadius: 8,
                border: "1px solid #8c52ff",
                color: "#8c52ff",
                fontWeight: "bold",
              }}
              block
              size="large"
              onClick={() => navigate("/dashboard")}
              onMouseEnter={e => (e.currentTarget.style.background = "#f0f0ff")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              Add More Items
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
