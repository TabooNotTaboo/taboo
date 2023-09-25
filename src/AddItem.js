import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddItem() {
  const [newItem, setNewItem] = useState({ name: '', email: '', age: '' });
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await axios.post('https://13.212.182.252:8443/demo/api/v1/customers', newItem);
      navigate('/'); 
    } catch (error) {
      console.error('Lỗi khi tạo mới đối tượng:', error);
    }
  };

  return (
    <div>
      <h1>Thêm mới đối tượng</h1>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newItem.email}
          onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
        />
        <input
          type="number" 
          placeholder="Age"
          value={newItem.age}
          onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}
        />
        <button type="submit">Lưu</button>
      </form>
      <Link to="/">Quay lại danh sách</Link>
    </div>
  );
}

export default AddItem;


