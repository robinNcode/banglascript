import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Docs from '../pages/Docs';
import Editor from '../pages/Editor';
import Feedback from "../pages/Feedback.tsx";
import BlockCoding from '../pages/BlockCoding.tsx';
import Quiz from '../pages/Quiz.tsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/kidscoder/block-coding" element={<BlockCoding />} />
        <Route path="/kidscoder/quiz-guide" element={<Quiz />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}
