import { Image, Modal, Typography, Divider, Tag } from "antd";
import { ProductData } from "../../layout/dashboard/ProductInterface";
import { useState } from "react";

const { Text, Title, Paragraph } = Typography;

interface PreviewProductProps {
    visible: boolean;
    item: ProductData | null;
    onClose: () => void;
}

export default function PreviewProduct({
    visible,
    item,
    onClose,
}: PreviewProductProps) {
    if (!item) return null;
    const [selectedImage, setSelectedImage] = useState(0);
    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={600}
            centered

        >
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <Image
                    src={item.images[selectedImage]}
                    preview={false}
                    style={{
                        height: "350px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                />
                <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 8 }}>
                    {item.images.map((img, idx) => (
                        <Image
                            key={idx}
                            src={img}
                            preview={false}
                            width={60}
                            height={60}
                            style={{
                                objectFit: "cover",
                                border: selectedImage === idx ? "2px solid #1890ff" : "1px solid #eee",
                                borderRadius: 8,
                                cursor: "pointer",
                            }}
                            onClick={() => setSelectedImage(idx)}
                        />
                    ))}
                </div>
            </div>

            <div style={{ textAlign: "center" }}>
                <Title level={3} style={{ marginBottom: 8 }}>
                    {item.title}
                </Title>
                <Tag color="rgb(140, 82, 255)" style={{ fontSize: 16, padding: "6px 10px" }}>
                    Category: {item.category.name}
                </Tag>
            </div>

            <Divider />

            <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
                {item.description}
            </Paragraph>

            <Text strong style={{ fontSize: 18 }}>
                Price: <Text type="danger" style={{ fontSize: "20px" }}>${item.price}</Text>
            </Text>
        </Modal>
    );
}
