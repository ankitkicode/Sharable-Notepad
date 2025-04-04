// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NoteViewer from './components/NoteViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/note/:customId" element={<NoteViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
