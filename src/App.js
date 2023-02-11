import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Errorpage from "./pages/Errorpage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Login from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import Address from "./pages/Address";
import AddressSelect from "./pages/AddressSelect";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/sign-in" exact element={<Login />} />
        <Route path="/sign-up" exact element={<RegistrationPage />} />
        <Route path="/product/:id" exact element={<ProductPage />} />
        <Route path="/profile" exact element={<ProfilePage />} />
        <Route path="/address" exact element={<Address />} />
        <Route path="/orders" exact element={<OrdersPage />} />
        <Route path="/address-select" exact element={<AddressSelect />} />
        <Route path="/checkout/:id" exact element={<CheckoutPage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
