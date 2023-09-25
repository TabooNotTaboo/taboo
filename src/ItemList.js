import React from 'react';
import { Link } from 'react-router-dom';

function ItemList({ data }) {
  return (
    <div>
      <h2>Danh sách đối tượng</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.id} - {item.name} - {item.email}
            <Link to={`/edit/${item.id}`}>Chỉnh Sửa</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
