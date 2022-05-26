import './App.css';
import Home from './pages/Home/Home';
import SearchOrAddRecord from './pages/SearchOrAddRecord/SearchOrAddRecord';
import CreateOrder from './pages/Create_Order/Create_Order';
import ViewOrderDetail from './pages/ViewOrderDetails/ViewOrderDetails';
import Main from './pages/Main/Main';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App bg-[#171719] min-h-[100vh]">
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/se-or-add" element={<SearchOrAddRecord />} />
        <Route index element={<Home divClasses="bg-[#171719] min-h-[100vh]"/>} />
        <Route path='create_order' element={<CreateOrder />}/>
        <Route path="/:docid" element={<ViewOrderDetail />} />
      </Routes>
    </div>
  );
}

export default App;
