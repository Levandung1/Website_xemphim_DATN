import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories/from-movies"
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <TitleBar>
        <Title>🏷️ Quản lý thể loại</Title>
      </TitleBar>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Tên thể loại</Th>
              <Th>Số lượng phim</Th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{c.name}</Td>
                <Td>{c.count}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ManageCategories;
