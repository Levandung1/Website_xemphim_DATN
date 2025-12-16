import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/watch-history";

const Container = styled.div`
  color: black;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 8px;
  border-collapse: collapse;
  color: black;
`;

const Th = styled.th`
  background: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
`;

const ManageWatchHistory = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setHistory(res.data);

    } catch (err) {
      console.error("Lỗi khi lấy lịch sử xem:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá lịch sử này?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchHistory();

    } catch (err) {
      console.error("Lỗi khi xoá lịch sử:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Container>
      <Title>🕒 Quản lý lịch sử xem</Title>

      <Table>
        <thead>
          <tr>
            <Th>Người dùng</Th>
            <Th>Phim</Th>
            <Th>Thời gian xem</Th>
            <Th>Ngày xem</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>

        <tbody>
          {history.map(item => (
            <tr key={item._id}>
              <Td>{item.user?.username || "Unknown"}</Td>
              <Td>{item.movie?.title || "Unknown"}</Td>
              <Td>{item.lastWatchedTime}s</Td>
              <Td>{new Date(item.date).toLocaleString("vi-VN")}</Td>
              <Td>
                <ActionButton onClick={() => handleDelete(item._id)}>
                  Xoá
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageWatchHistory;
