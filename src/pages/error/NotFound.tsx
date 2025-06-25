
import { Result, Button, Card } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
    },
    card: {
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      maxWidth: '600px',
      width: '100%',
    },
    icon: {
      fontSize: '60px',
      color: '#ff4d4f',
      animation: 'pulse 2s infinite',
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Result
          icon={<FrownOutlined style={styles.icon} />}
          status="404"
          title="Page Not Found"
          subTitle="Sorry, the page you are looking for doesn't exist or has been moved."
          extra={
            <Button type="primary" size="large" onClick={() => navigate('/')}>
              Take Me Home
            </Button>
          }
        />
      </Card>
    </div>
  );
};

export default NotFoundPage;
