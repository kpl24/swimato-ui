import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import Home from "./screens/home";
import RestaurantDetails from "./screens/restaurant-details";
import Reviews from "./screens/restaurant-details/reviews";
import Header from "./components/header";
import { persistor, store } from "./redux/store";
import ProtectedRoute from "./components/protected-route";
import Unauthorized from "./screens/authenticate/unauthorized";
import ManageRestaurants from "./screens/admin/manage-restaurants";
import AddRestaurant from "./screens/admin/add-restaurant";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="" element={<Home />} />
              <Route path="restaurant/:restaurantId" element={<RestaurantDetails />} >
                <Route path="reviews" element={<Reviews />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="/admin/restaurants" element={<ProtectedRoute><ManageRestaurants /></ProtectedRoute>} />
            <Route path="/admin/restaurants/add" element={<ProtectedRoute><AddRestaurant /></ProtectedRoute>} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App;