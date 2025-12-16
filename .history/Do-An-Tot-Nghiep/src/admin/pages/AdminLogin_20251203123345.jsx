import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginWrapper = styled.div`
  height: 100vh;
  background: #141414;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  margin-bottom: 25px;
  color: #e50914;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  background: #e50914;
  color: white;
  padding: 10px;
  border: none;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username: form.username,
        password: form.password
      });

      // Lưu token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", "true");

      // Chuyển qua trang admin
      navigate('/admin/manage-movies');

    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu!");
      console.error(err);
    }
  };

  return (
    <LoginWrapper>
      <LoginBox>
        <Title>Đăng nhập Admin</Title>
        <FormGroup>
          <Label>Tên đăng nhập</Label>
          <Input name="username" value={form.username} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Mật khẩu</Label>
          <Input name="password" type="password" value={form.password} onChange={handleChange} />
        </FormGroup>
        <Button onClick={handleLogin}>Đăng nhập</Button>
        {error && <Error>{error}</Error>}
      </LoginBox>
    </LoginWrapper>
  );
};

export default AdminLogin;
