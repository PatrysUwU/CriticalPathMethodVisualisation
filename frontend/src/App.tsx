import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import GraphPage from "./Pages/GraphPage.tsx";
import TablePage from "./Pages/TablePage.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </Router>
  );
}
