
import { useSelector } from 'react-redux';
import './App.css'
import { ProductForm } from './components/form';
import Login from './pages/Login'
// import { ProductForm } from './components/form'
import Signup from './pages/Signup'
import {Routes,Route, Navigate} from "react-router-dom";
import MainLayout from './components/MainLayout';

function App() {
  const isLoggedIn=useSelector((state)=>state.auth.status);

  return (<>
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/sign-up' element={<Signup/>}/>
    <Route path='/' element={isLoggedIn ? <MainLayout/> : <Navigate to="/login" replace/>}/>
  </Routes>

 
  </>
    
  )
}

export default App
