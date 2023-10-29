import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogPost from "./pages/BlogPost";
import About from './pages/About';
import Glossary from './pages/Glossary';
import Home from './pages/Home';

function App() {
return (
  <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/articles/:slug" element={<BlogPost />} />
          <Route path="about" element={<About />} />
          <Route path="glossary" element={<Glossary />} />
      </Routes>
  </BrowserRouter>
);
}

export default App;
