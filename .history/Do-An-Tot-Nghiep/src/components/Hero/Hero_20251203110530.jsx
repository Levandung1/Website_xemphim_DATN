import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.8) 100%
  ),
  url("/images/banner.jpg") no-repeat center center/cover;
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
  display: flex;
  align-items: flex-end;
  gap: 40px;
`;

const Content = styled.div`
  color: white;
  max-width: 700px;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2 rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.5 rem;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:first-child {
    background-color: #e50914;
    color: white;

    &:hover {
      background-color: #b2070e;
    }
  }

  &:last-child {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;

    &:hover {
      background-color: rgba(109, 109, 110, 0.4);
    }
  }
`;

const PosterSection = styled.div`
  flex-shrink: 0;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 700px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const Hero = () => {
  return (
    <Container>
      <ContentWrapper>
        <Content>
          <Title>Phát đạn của kẻ điên</Title>
          <Description>
            Một bộ phim hành động - tâm lý kịch tính,
            xoay quanh một kẻ sát nhân bí ẩn gieo rắc nỗi kinh hoàng bằng những phát đạn lạnh lùng và tàn nhẫn.
            Mỗi nạn nhân đều có liên kết đến một quá khứ đen tối mà chính hắn muốn lật lại.
            Khi cảnh sát dấn thân vào cuộc điều tra, ranh giới giữa chính nghĩa và điên loạn dần mờ nhạt,
            hé lộ một âm mưu đẫm máu và sự thật không ai ngờ tới.
          </Description>
          <ButtonGroup>
            <Button>▶ Xem ngay</Button>
            <Button>Chi tiết</Button>
          </ButtonGroup>
        </Content>
        <PosterSection>
          <Poster src="./poster.jpg" alt="Giấc Mơ Cầm Quỷ Dữ Poster" />
        </PosterSection>
      </ContentWrapper>
    </Container>
  );
};

export default Hero;
