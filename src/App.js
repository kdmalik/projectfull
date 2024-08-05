
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login  from './components/Login';
import Signup  from './components/Signup';
import { Home } from './components/Home';
import  First  from './components/First';
function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route element={<Login/>} path='/login'/>
      <Route element={<Signup/>} path='/signup'/>
      <Route element={<Home/>} path='/home'/>
      <Route element={<First/>} path='/'/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
