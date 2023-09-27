import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function EditItem() {
  const { id } = useParams();
  const [editedItem, setEditedItem] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://13.250.65.254:8443/demo20/api/v1/customers/${id}`);
      setEditedItem(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://13.250.65.254:8443/demo20/api/v1/customers/${id}`, editedItem);
      navigate('/');  
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
    }
  };

  const handleNameChange = (e) => {
    setEditedItem({ ...editedItem, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEditedItem({ ...editedItem, email: e.target.value });
  };

  return (
    <div>
      <h1>Chỉnh sửa đối tượng</h1>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Name"
          value={editedItem.name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Email"
          value={editedItem.email}
          onChange={handleEmailChange}
        />
        <button type="submit">Lưu</button>
      </form>
      <Link to="/">Quay lại danh sách</Link>
    </div>
  );
}

export default EditItem;
