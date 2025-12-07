import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  color: black;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2``;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  color: black;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  color: black;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  color: black;
`;

const ActionButton = styled.button`
  margin-right: 10px;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.edit ? '#007bff' : '#dc3545'};
  color: white;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  color: black;
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: ${props => props.cancel ? '#6c757d' : '#e50914'};
`;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Lỗi khi tải users:', err));
  }, []);

  const openEditModal = (user) => {
    setFormData(user);
    setEditingUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ username: '', email: '' });
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setUsers(prev =>
      prev.map(u => (u._id === editingUser._id ? { ...formData, _id: u._id } : u))
    );
    closeModal();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Bạn có chắc muốn xoá người dùng này?');
    if (confirm) {
      setUsers(prev => prev.filter(u => u._id !== id));
    }
  };

  return (
    <Container>
      <TitleBar>
        <Title>👥 Quản lý người dùng</Title>
      </TitleBar>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Tên đăng nhập</Th>
            <Th>Email</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <Td>{user._id}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>
                <ActionButton edit onClick={() => openEditModal(user)}>Sửa</ActionButton>
                <ActionButton onClick={() => handleDelete(user._id)}>Xoá</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>Sửa thông tin người dùng</ModalTitle>
            <FormGroup>
              <Label>Tên đăng nhập</Label>
              <Input name="username" value={formData.username} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input name="email" value={formData.email} onChange={handleInputChange} />
            </FormGroup>
            <ModalButtonGroup>
              <ModalButton cancel onClick={closeModal}>Huỷ</ModalButton>
              <ModalButton onClick={handleSubmit}>Lưu</ModalButton>
            </ModalButtonGroup>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ManageUsers;
