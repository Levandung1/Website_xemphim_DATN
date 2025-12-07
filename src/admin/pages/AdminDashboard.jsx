import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
  color: black; /* ✅ đảm bảo toàn bộ chữ mặc định là đen */
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #e50914;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  color: black; /* ✅ chữ trong card là đen */
`;

const StatLabel = styled.p`
  font-size: 0.95rem;
  color: #333; /* ✅ chỉnh lại thành đen hơn */
`;

const StatValue = styled.h3`
  font-size: 1.8rem;
  margin-top: 5px;
  color: #000; /* ✅ chỉnh đậm thành đen */
`;

const AdminDashboard = () => {
  return (
    <Container>
      <Title>📊 Bảng điều khiển Admin</Title>
      <StatsGrid>
        <StatCard>
          <StatLabel>Số lượng phim</StatLabel>
          <StatValue>128</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Người dùng đã đăng ký</StatLabel>
          <StatValue>53</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Bình luận mới</StatLabel>
          <StatValue>14</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Lượt xem hôm nay</StatLabel>
          <StatValue>2,310</StatValue>
        </StatCard>
      </StatsGrid>
    </Container>
  );
};

export default AdminDashboard;