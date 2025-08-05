import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Docs from '../pages/Docs';
import Editor from '../pages/Editor';
import Feedback from "../pages/Feedback.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}
