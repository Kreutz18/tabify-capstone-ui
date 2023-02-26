import './App.css';
import { NavigationBar } from './navbar/navbar.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './AppRouter';
import React, { Component } from 'react';


const isLogin = localStorage.getItem("user");

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <AppRouter />
    </div>
  );
}

export default App;
