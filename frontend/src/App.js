import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Category,
  Contact,
  Header,
  Home,
  Shop,
  SignIn,
  SignUp,
  CheckOut,
} from "./exports";
import { CartProvider } from "./context/CartContext";
import "react-toastify/dist/ReactToastify.css"; //

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/category" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ToastContainer autoClose={2000} />
      </CartProvider>
    </>
  );
}

export default App;
