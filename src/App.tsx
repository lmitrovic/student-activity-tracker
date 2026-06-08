import { Routes, Route } from 'react-router-dom';
import TestSelectionPage from './components/TestSelectionPage';
import TestPage from './components/TestPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestSelectionPage />} />
      <Route path="/test/:testName" element={<TestPage />} />
    </Routes>
  );
}
