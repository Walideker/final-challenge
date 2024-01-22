import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);

  const logout = () => {
    window.location.href = '/login';
  }

  useEffect(() => {
    axios.get('http://localhost:3000/getItems')
      .then(response => {
        setItems(response.data);
        console.log('Items from server:', response.data);
      })
      .catch(err => console.log('Error fetching items:', err));
  }, []);

  console.log('Items in state:', items);

  return (
    <div className="container mt-5 text-center">
      <h3>Hello my friend congrats you have access to the Krusty Krab recipes secrets</h3>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                {item.ingredients && item.ingredients.length > 0 ? item.ingredients.join(', ') : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-danger mt-5' onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
