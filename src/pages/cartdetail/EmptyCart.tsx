import { ShoppingOutlined } from "@ant-design/icons";
import { Button, Empty, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const {Title, Text} = Typography

export default function EmptyCart() {
    const navigate = useNavigate()
    return (
        <div
            style={{
                padding: 50,
                textAlign: "center",
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                maxWidth: 400,
                margin: "80px auto",
            }}
        >
            <Empty
                image={<ShoppingOutlined style={{ fontSize: 64, color: "#8c52ff" }} />}
                description={
                    <Space direction="vertical" size={3}>
                        <Title level={3}>Your Cart is Empty</Title>
                        <Text type="secondary" style={{ fontSize: 18 }}>
                            Looks like you haven’t added anything to your bag yet.
                        </Text>
                    </Space>
                }
            />
            <Button
                size="large"
                style={{
                    marginTop: 24,
                    borderRadius: 8,
                    background: "linear-gradient(90deg, #8c52ff 0%, #5ce1e6 100%)",
                    color: "white",
                    fontWeight: "bold",
                }}
                onClick={() => navigate("/dashboard")}
            >
                Go to Dashboard
            </Button>
        </div>
    )
}
