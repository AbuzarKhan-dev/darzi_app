import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import CreateOrder from './pages/Create_Order/Create_Order';
import ViewOrderDetail from './pages/ViewOrderDetails/ViewOrderDetails';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App bg-[#171719] min-h-[100vh]">
      <Routes>
        <Route index element={<Home divClasses="bg-[#171719] min-h-[100vh]"/>} />
        <Route path='create_order' element={<CreateOrder />}/>
        <Route path="/:docid" element={<ViewOrderDetail />} />
      </Routes>
    </div>
  );
}

export default App;
