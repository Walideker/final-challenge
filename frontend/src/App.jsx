import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sign from './sign';
import Login from './login';
import Home from './home';

function App() {
  return (
    <div className="App">
      <div>
      </div>
      <BrowserRouter>
        <Routes>
        <Route path='/home' element={<Home />} />
          <Route path='/' element={<Sign />} />
          <Route path='/register' element={<Sign />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
