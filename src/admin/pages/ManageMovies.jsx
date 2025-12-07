import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/movies';

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
  background-color: ${props => (props.edit ? '#007bff' : '#dc3545')};
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
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
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
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
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
  cursor: pointer;
  background-color: ${props => (props.cancel ? '#6c757d' : '#e50914')};
`;

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    genre: '',
    director: '',
    actors: '',
    country: '',
    duration: '',
    rating: '',
    views: '',
    posterUrl: '',
    backdropUrl: '',
    trailerUrl: '',
    trailerFile: null
  });

  // Load movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(API_URL);
      setMovies(res.data);
    } catch (err) {
      console.error('Lỗi khi tải phim:', err);
    }
  };

  const openAddModal = () => {
    setFormData({
      title: '',
      description: '',
      year: '',
      genre: '',
      director: '',
      actors: '',
      country: '',
      duration: '',
      rating: '',
      views: '',
      posterUrl: '',
      backdropUrl: '',
      trailerUrl: '',
      trailerFile: null
    });
    setEditingMovie(null);
    setModalOpen(true);
  };

  const openEditModal = (movie) => {
    setFormData(movie);
    setEditingMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      title: '',
      description: '',
      year: '',
      genre: '',
      director: '',
      actors: '',
      country: '',
      duration: '',
      rating: '',
      views: '',
      posterUrl: '',
      backdropUrl: '',
      trailerUrl: '',
      trailerFile: null
    });
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file:', file.name);
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response.data);
      if (response.data.fileUrl) {
        setFormData(prev => ({
          ...prev,
          trailerUrl: `http://localhost:5000${response.data.fileUrl}`,
          trailerFile: file
        }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Lỗi khi upload video!');
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingMovie) {
        await axios.put(`${API_URL}/${editingMovie._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      await fetchMovies();
      closeModal();
    } catch (err) {
      console.error('Lỗi khi lưu phim:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Bạn có chắc muốn xoá phim này?');
    if (confirm) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchMovies();
      } catch (err) {
        console.error('Lỗi khi xoá phim:', err);
      }
    }
  };

  return (
    <Container>
      <TitleBar>
        <Title>🎬 Quản lý phim</Title>
        <AddButton onClick={openAddModal}>➕ Thêm phim</AddButton>
      </TitleBar>

      <Table>
        <thead>
          <tr>
            <Th>Tiêu đề</Th>
            <Th>Đạo diễn</Th>
            <Th>Năm</Th>
            <Th>Thể loại</Th>
            <Th>Lượt xem</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <Td>{movie.title}</Td>
              <Td>{movie.director}</Td>
              <Td>{movie.year}</Td>
              <Td>{movie.genre}</Td>
              <Td>{movie.views}</Td>
              <Td>
                <ActionButton edit onClick={() => openEditModal(movie)}>Sửa</ActionButton>
                <ActionButton onClick={() => handleDelete(movie._id)}>Xoá</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>{editingMovie ? 'Sửa phim' : 'Thêm phim mới'}</ModalTitle>
            <FormGroup>
              <Label>Tiêu đề</Label>
              <Input name="title" value={formData.title} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Mô tả</Label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              />
            </FormGroup>
            <FormGroup>
              <Label>Năm</Label>
              <Input 
                name="year" 
                value={formData.year} 
                onChange={handleInputChange}
                type="number" 
              />
            </FormGroup>
            <FormGroup>
              <Label>Thể loại</Label>
              <Input name="genre" value={formData.genre} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Đạo diễn</Label>
              <Input name="director" value={formData.director} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Diễn viên</Label>
              <Input name="actors" value={formData.actors} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Quốc gia</Label>
              <Input name="country" value={formData.country} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Thời lượng (phút)</Label>
              <Input 
                name="duration" 
                value={formData.duration} 
                onChange={handleInputChange}
                type="number"
              />
            </FormGroup>
            <FormGroup>
              <Label>Đánh giá</Label>
              <Input 
                name="rating" 
                value={formData.rating} 
                onChange={handleInputChange}
                type="number"
                step="0.1"
                min="0"
                max="10"
              />
            </FormGroup>
            <FormGroup>
              <Label>Poster URL</Label>
              <Input name="posterUrl" value={formData.posterUrl} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Backdrop URL</Label>
              <Input name="backdropUrl" value={formData.backdropUrl} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Trailer</Label>
              <Input 
                type="file" 
                accept="video/*"
                onChange={handleFileChange}
              />
              {formData.trailerUrl && (
                <div style={{ marginTop: '10px' }}>
                  <video 
                    src={formData.trailerUrl} 
                    controls 
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                </div>
              )}
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

export default ManageMovies;
