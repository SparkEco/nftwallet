import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Home from "./pages/home";
import Explorer from "./pages/explorer";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
