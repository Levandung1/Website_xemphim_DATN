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
    background: rgba(0, 0, 0, 0.5); /* Lớp phủ tối để làm nổi bật form */
  }
`;

export const FormWrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 40px;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  z-index: 1;
  color: #fff;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  background: #333;
  color: #fff;
  font-size: 16px;
  &::placeholder {
    color: #8c8c8c;
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
  margin: 20px 0;
  &:hover {
    background: #f40612;
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

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-size: 14px;
  color: #b3b3b3;
  input {
    margin-right: 10px;
  }
`;

export const SmallText = styled.p`
  color: #b3b3b3;
  font-size: 13px;
  margin: 10px 0;
`;