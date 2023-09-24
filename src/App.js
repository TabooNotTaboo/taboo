import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', email: '' });
  const [editedItem, setEditedItem] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://175.41.185.23:8443/demo/api/v1/customers');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.email) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      let response;
      if (editMode) {
        response = await axios.put(`https://175.41.185.23:8443/demo/api/v1/customers/${editedItem.id}`, {
          name: editedItem.name,
          email: editedItem.email,
        });
      } else {
        response = await axios.post('https://175.41.185.23:8443/demo/api/v1/customers', newItem);
      }

      const updatedData = editMode
      ? data.map(item => (item.id === editedItem.id ? editedItem : item))
      : [...data, response.data];

      setData(updatedData);
      setNewItem({ name: '', email: '' });
      setEditedItem({ name: '', email: '' });
      setEditMode(false);

      fetchData();
    } catch (error) {
      console.error(editMode ? 'Lỗi khi chỉnh sửa đối tượng:' : 'Lỗi khi thêm đối tượng mới:', error);
    }
  };

  const handleDelete = async (idToDelete) => {
    try {
      await axios.delete(`https://175.41.185.23:8443/demo/api/v1/customers/${idToDelete}`);
      const updatedData = data.filter(item => item.id !== idToDelete);
      setData(updatedData);

      fetchData();
    } catch (error) {
      console.error('Lỗi khi xóa đối tượng:', error);
    }
  };

  const handleEditClick = (itemToEdit) => {
    setEditedItem(itemToEdit);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditedItem({ name: '', email: '' });
    setEditMode(false);
  };

  const renderForm = () => (
    <form onSubmit={handleAddOrUpdate}>
      <input
        type="hidden"
        value={editedItem.id}
        onChange={e => setEditedItem({ ...editedItem, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={editMode ? editedItem.name : newItem.name}
        onChange={e =>
          editMode
            ? setEditedItem({ ...editedItem, name: e.target.value })
            : setNewItem({ ...newItem, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Email"
        value={editMode ? editedItem.email : newItem.email}
        onChange={e =>
          editMode
            ? setEditedItem({ ...editedItem, email: e.target.value })
            : setNewItem({ ...newItem, email: e.target.value })
        }
      />
      {editMode && (
        <div>
          <button type="submit">Lưu</button>
          <button onClick={cancelEdit}>Hủy</button>
        </div>
      )}
      {!editMode && <button type="submit">Thêm</button>}
    </form>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Bảng Dữ liệu từ API:</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleEditClick(item)}>Chỉnh Sửa</button>
                <button onClick={() => handleDelete(item.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{editMode ? 'Chỉnh Sửa Đối Tượng' : 'Thêm Đối Tượng Mới'}</h2>
      {renderForm()}
    </div>
  );
}

export default App;
