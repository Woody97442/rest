import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { CartPage } from "@/pages/CartPage";
import AccountPage from "@/pages/AccountPage";
import { ValideOrderPage } from "./pages/ValidOrderPage";
import { OrderCommandePage } from "./pages/OrderCommandePage";
const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/account", element: _jsx(AccountPage, {}) }), _jsx(Route, { path: "/ordervalidee", element: _jsx(ValideOrderPage, {}) }), _jsx(Route, { path: "/ordercommande", element: _jsx(OrderCommandePage, {}) })] }));
};
export default App;
