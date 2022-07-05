import "./App.css";
import SignIn from "./pages/Sign-in/Sign-in";
import Otp from "./pages/Otp/Otp";
import Home from "./pages/Home/Home";
import SearchOrAddRecord from "./pages/SearchOrAddRecord/SearchOrAddRecord";
import SelectClothesType from "./pages/SelectClothesType/SelectClothesType";
import AddMeasurements from "./components/AddMeasurements/AddMeasurements";
import CreateRecord from "./pages/CreateRecord/CreateRecord";
import CreateOrder from "./pages/Create_Order/Create_Order";
import ViewOrderDetail from "./pages/ViewOrderDetails/ViewOrderDetails";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className=" min-h-[100vh]">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/home" element={<Home divClasses="min-h-[100vh]" />} />
        <Route path="/se-or-add" element={<SearchOrAddRecord />} />
        <Route path="/se-cl-type/:orderID" element={<SelectClothesType />} />
        <Route path="se-cl-type/:orderID/:type" element={<AddMeasurements />} />

        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/create-record" element={<CreateRecord />} />
        <Route path="/create-order/:id" element={<CreateOrder />} />
        <Route path="/details/:id" element={<ViewOrderDetail />} />
      </Routes>
    </div>
  );
}

export default App;

// bg-[#171719]
