import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { CartPage } from "@/pages/CartPage";
import AccountPage from "@/pages/AccountPage";
import { ValideOrderPage } from "./pages/ValidOrderPage";
import { OrderCommandePage } from "./pages/OrderCommandePage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/cart"
        element={<CartPage />}
      />
      <Route
        path="/account"
        element={<AccountPage />}
      />
      <Route
        path="/ordervalidee"
        element={<ValideOrderPage />}
      />
      <Route
        path="/ordercommande"
        element={<OrderCommandePage />}
      />
    </Routes>
  );
};

export default App;
