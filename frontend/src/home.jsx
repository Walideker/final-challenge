import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/getItems')
      .then(response => {
        setItems(response.data);
        console.log(response.data); // Add this line for debugging
      })
      .catch(err => console.log(err));
  }, []);

  console.log(items); // Add this line for debugging

  return (
    <div className="container mt-5 text-center">
      <h3>Hello my friend congrats you have access to the Krusty Krab recipes secrets</h3>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Ingredients</th> {/* Add this line for ingredients */}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                {item.ingredients && item.ingredients.length > 0 ? (
                  <ul>
                    {item.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
