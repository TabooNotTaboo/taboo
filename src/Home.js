import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://13.250.65.254:8443/demo20/api/v1/customers');
      setData(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const handleDelete = async (idToDelete) => {
    try {
      await axios.delete(`https://13.250.65.254:8443/demo20/api/v1/customers/${idToDelete}`);
      fetchData();
    } catch (error) {
      console.error('Lỗi khi xóa đối tượng:', error);
    }
  };

  return (
    <div>
      <h1>Danh sách đối tượng</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.id} - {item.name} - {item.email}
            <Link to={`/edit/${item.id}`}>Chỉnh sửa</Link>
            <button onClick={() => handleDelete(item.id)}>Xóa</button>
          </li>
        ))}
      </ul>
      <Link to="/add">Thêm mới</Link>
    </div>
  );
}

export default Home;
