import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Docs from '../pages/Docs';
import Editor from '../pages/Editor';
import Feedback from "../pages/Feedback.tsx";
import KidsCoderBlockCoding from '../pages/KidsCoderBlockCoding';
import KidsCoderQuizGuide from '../pages/KidsCoderQuizGuide';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/kidscoder/block-coding" element={<KidsCoderBlockCoding />} />
        <Route path="/kidscoder/quiz-guide" element={<KidsCoderQuizGuide />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}
