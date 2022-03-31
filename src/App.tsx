import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './store';
import  Header from './components/Header';
import AllCourse from './components/AllCourse';
import Notification from './components/Notification';
import Course from './components/Course';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header/>
        <Routes>
          <Route path='/' element={<Navigate to='courses'/>}/>
          <Route path='/courses' element={<AllCourse/>}/>
          <Route path='/:source/:id' element={<Course source=''/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Routes>
        <Notification/>
      </Provider>
    </Router>
  );
}

export default App;
