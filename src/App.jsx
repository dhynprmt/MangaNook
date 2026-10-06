import { Routes, Route } from "react-router-dom";
/*import { ThemeProvider } from "./context/themecontext";*/
import MainLayout from "./layouts/mainlayouts";
import Dashboard from "./pages/frontpages/dashboard";
import ProductDetail from "./pages/frontpages/productdetail";
import Cart from "./pages/frontpages/cart";
import Checkout from "./pages/frontpages/checkout";
import Products from "./pages/frontpages/products";
import OrderSuccess from "./pages/frontpages/ordersuccess";
import AdminLayout from "./layouts/adminlayouts";
import AdminDashboard from "./pages/adminpages/admindashboard";
import AdminAbout from "./pages/adminpages/adminabout";

export default function App() {
  return (
    /*<ThemeProvider>*/
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="products" element={<Products />} />
          <Route path="ordersuccess" element={<OrderSuccess />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="about" element={<AdminAbout />} />
        </Route>
      </Routes>
    /*</ThemeProvider>*/
  );
}