import "./styles/_base.scss";
import Home from "./pages/Home";
import { CardLayout } from "./pages/SharedCardLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardDetails from "./pages/CardDetails";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CardLayout />}>
            <Route index element={<Home />} />
            <Route path=":id" element={<CardDetails />} />
            <Route path="/reservation" element={<Reservation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
