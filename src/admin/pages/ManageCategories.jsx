// src/admin/pages/ManageCategories.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: black; /* ✅ đảm bảo chữ mặc định là đen */
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2``;

const AddButton = styled.button`
  background-color: #e50914;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 8px;
  border-collapse: collapse;
  color: black; /* ✅ chữ trong bảng là đen */
`;

const Th = styled.th`
  background: #f2f2f2;
  padding: 10px;
  text-align: left;
  color: black; /* ✅ header chữ đen */
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: black; /* ✅ nội dung ô là đen */
`;

const ActionButton = styled.button`
  margin-right: 10px;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.edit ? '#007bff' : '#dc3545'};
  color: white;
  cursor: pointer;
`;

const ManageCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Hành động', count: 12 },
    { id: 2, name: 'Tình cảm', count: 5 },
  ]);

  const handleEdit = (category) => {
    alert(`Sửa thể loại: ${category.name}`);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Xoá thể loại này?');
    if (confirm) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <Container>
      <TitleBar>
        <Title>🏷️ Quản lý thể loại</Title>
        <AddButton>➕ Thêm thể loại</AddButton>
      </TitleBar>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Tên thể loại</Th>
            <Th>Số lượng phim</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <Td>{c.id}</Td>
              <Td>{c.name}</Td>
              <Td>{c.count}</Td>
              <Td>
                <ActionButton edit onClick={() => handleEdit(c)}>Sửa</ActionButton>
                <ActionButton onClick={() => handleDelete(c.id)}>Xoá</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageCategories;