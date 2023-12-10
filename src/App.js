import './App.css';
import {Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Nopage from './components/Nopage';

function App() {


const token = localStorage.getItem('token')

  return (

    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={token !== null ? <Home />:<Nopage/>} />
        <Route path='*' element={<Nopage />} />
      </Routes>
    </div>

  );
}

export default App;
