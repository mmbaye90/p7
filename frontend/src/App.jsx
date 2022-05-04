import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/styles/app.css";
import Layout from "./pages/Layout"
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Trending from "./pages/Trending"
import NotFound from "./pages/NotFound";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profil" element={<Profil />} />
        <Route path="trending" element={<Trending />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
};

export default App;
