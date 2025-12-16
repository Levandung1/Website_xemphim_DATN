import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const API_URL = "http://localhost:5000/api/watch";

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
  border-radius: 4px;
  background: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: ${p => (p.active ? "#e50914" : "#fff")};
  color: ${p => (p.active ? "#fff" : "#000")};
  cursor: pointer;
`;

const formatWatchTime = (seconds = 0) => {
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  if (h > 0) return `${h} giờ ${m} phút ${s} giây`;
  if (m > 0) return `${m} phút ${s} giây`;
  return `${s} giây`;
};

const ManageWatchHistory = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

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

  const totalPages = Math.ceil(history.length / pageSize);
  const paginatedHistory = history.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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
          {paginatedHistory.map(item => (
            <tr key={item._id}>
              <Td>{item.user?.username || "Unknown"}</Td>
              <Td>{item.movie?.title || "Unknown"}</Td>
              <Td>{formatWatchTime(item.lastWatchedTime)}</Td>
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

      {totalPages > 1 && (
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <PageButton
              key={i}
              active={page === i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default ManageWatchHistory;
