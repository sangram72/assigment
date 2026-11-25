
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import DataImport from "./pages/DataImport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/import" element={<DataImport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
