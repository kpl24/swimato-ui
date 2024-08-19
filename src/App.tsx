import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Home from "./screens/home";
import RestaurantDetails from "./screens/restaurant-details";

const App = () => {
  return (
    <div className="container-xl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;