import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/src/assets/background.jpg') no-repeat center center/cover;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6); /* Lớp phủ tối hơn một chút so với trang đăng nhập */
  }
`;

export const FormWrapper = styled.div`
  background: rgba(0, 0, 0, 0.85); /* Màu nền form đậm hơn một chút */
  padding: 50px; /* Tăng padding để form rộng rãi hơn */
  border-radius: 8px; /* Bo góc lớn hơn */
  width: 100%;
  max-width: 450px; /* Form rộng hơn một chút so với trang đăng nhập */
  z-index: 1;
  color: #fff;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Thêm bóng để form nổi bật */
`;

export const Title = styled.h1`
  font-size: 36px; /* Tiêu đề lớn hơn */
  margin-bottom: 25px;
  color: #e50914; /* Màu đỏ Netflix cho tiêu đề */
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 12px 0; /* Tăng khoảng cách giữa các input */
  border: none;
  border-radius: 4px;
  background: #444; /* Màu nền input sáng hơn một chút */
  color: #fff;
  font-size: 16px;
  transition: background 0.3s ease;
  &::placeholder {
    color: #999;
  }
  &:focus {
    background: #555; /* Hiệu ứng khi focus */
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: #e50914; /* Màu đỏ Netflix */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 25px 0;
  transition: background 0.3s ease;
  &:hover {
    background: #f40612; /* Màu sáng hơn khi hover */
  }
`;

export const LinkText = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

export const SmallText = styled.p`
  color: #b3b3b3;
  font-size: 13px;
  margin: 10px 0;
`;