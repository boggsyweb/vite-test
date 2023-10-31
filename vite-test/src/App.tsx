import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogEntry from "./pages/SingleBlog";
import About from "./pages/About";
import Glossary from "./pages/Glossary";
import FilteredPosts from "./components/FilteredPosts";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/articles/:slug" element={<BlogEntry />} />
        <Route path="/tags/:tag" element={<FilteredPosts />} />
        <Route path="about" element={<About />} />
        <Route path="glossary" element={<Glossary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
