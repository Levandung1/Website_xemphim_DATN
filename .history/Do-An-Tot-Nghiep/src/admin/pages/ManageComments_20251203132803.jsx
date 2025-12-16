import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
const API_URL = "http://localhost:5000/api/comments";
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
  color: black;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: black;
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
`;

const ManageComments = () => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setComments(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bình luận:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc muốn xoá bình luận này?");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchComments();
    } catch (err) {
      console.error("Lỗi khi xoá bình luận:", err);
    }
  };

  return (
    <Container>
      <Title>💬 Quản lý bình luận</Title>

      <Table>
        <thead>
          <tr>
            <Th>Nội dung</Th>
            <Th>Người dùng</Th>
            <Th>Phim</Th>
            <Th>Ngày tạo</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>

        <tbody>
          {comments.map((c) => (
            <tr key={c._id}>
              <Td>{c.content}</Td>
              <Td>{c.userId?.username}</Td>
              <Td>{c.movieId?.title}</Td>
              <Td>{new Date(c.createdAt).toLocaleString("vi-VN")}</Td>
              <Td>
                <ActionButton onClick={() => handleDelete(c._id)}>Xoá</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageComments;
