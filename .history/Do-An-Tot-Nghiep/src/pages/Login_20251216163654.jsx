import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from "react-toastify";
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/VN-vi-20210607-popsignuptwoweeks-perspective_alpha_website_large.jpg');
  background-size: cover;
`;

const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 60px 68px 40px;
  border-radius: 4px;
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  color: white;
  font-size: 32px;
  margin-bottom: 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 16px 20px;
  border-radius: 4px;
  border: none;
  background: #333;
  color: white;
  font-size: 16px;

  &::placeholder {
    color: #8c8c8c;
  }
`;

const Button = styled.button`
  padding: 16px;
  border-radius: 4px;
  border: none;
  background: #e50914;
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-top: 24px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f40612;
  }
`;

const Error = styled.div`
  color: #e87c03;
  margin-bottom: 16px;
`;

const SignupText = styled.p`
  color: #737373;
  margin-top: 16px;

  a {
    color: white;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { username, password }
      );

      // Lưu token & user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      // 🔥 TOAST THÀNH CÔNG
      toast.success("🎉 Đăng nhập thành công!");

      // 👉 Chờ 1 chút cho user thấy toast rồi chuyển trang
      setTimeout(() => {
        navigate('/');
      }, 1200);

    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng nhập thất bại';
      setError(msg);

      // 🔥 TOAST THẤT BẠI
      toast.error(`❌ ${msg}`);
    }
  };
  return (
    <Container>
      <FormContainer>
        <Title>Đăng nhập</Title>
        {error && <Error>{error}</Error>}
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Đăng nhập</Button>
        </Form>
        <SignupText>
          Chưa có tài khoản?
          <Link to="/register">Đăng ký ngay</Link>
        </SignupText>
      </FormContainer>
    </Container>
  );
};

export default Login;
