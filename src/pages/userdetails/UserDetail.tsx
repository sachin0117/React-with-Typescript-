import { Card, Avatar, Typography, Divider, Space } from "antd";
import { MailOutlined, IdcardOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export type UserType = {
    id: number;
    name: string;
    email: string;
    avatar: string;
};

export default function UserDetail({ user }: { user: UserType }) {
    if (!user) return null;

    return (
        <Card
            style={{
                maxWidth: 400,
                margin: "auto",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
                background: "#fff"
            }}
        >
            <div
                style={{
                    background: "#8c52ff",
                    padding: "24px 0",
                    textAlign: "center",
                    color: "#fff",
                    margin: "-24px -24px 24px",
                }}
            >
                <Avatar
                    src={user.avatar}
                    size={96}
                    style={{
                        border: "3px solid #fff",
                        marginBottom: 12,
                        backgroundColor: "#fff",
                    }}
                />
                <Title level={2} style={{ color: "#fff", margin: 0 }}>{user.name}</Title>
                <Text style={{ color: "#f0f0f0" }}>
                    <UserOutlined style={{ marginRight: 6 }} />
                    Profile
                </Text>
            </div>

            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <Text>
                    <MailOutlined style={{ marginRight: 8, color: "#8c52ff" }} />
                  Email:  <strong style={{fontSize:"18px", marginLeft:"6px"}}> {user.email}</strong>
                </Text>
                <Text>
                    <IdcardOutlined style={{ marginRight: 8, color: "#8c52ff" }} />
                    User ID:<strong style={{fontSize:"18px", marginLeft:"6px"}}>{user.id}</strong> 
                </Text>
            </Space>

            <Divider style={{ margin: "24px 0" }} />

            <Text type="secondary" style={{ fontSize: 15 }}>
                This user is managed by the admin dashboard. For support, contact IT.
            </Text>
        </Card>
    );
}
