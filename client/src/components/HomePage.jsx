import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
  const [text, setText] = useState('');
  const [customId, setCustomId] = useState('');
  const navigate = useNavigate();

  const pasteText = async () => {
    try {
      const textFromClipboard = await navigator.clipboard.readText();
      setText(textFromClipboard);
    } catch (err) {
      alert('Failed to paste: ' + err);
    }
  };

  const saveNote = async () => {
    if (!text.trim() || !customId.trim()) {
      alert('Please enter both text and custom ID!');
      return;
    }

    const response = await fetch('http://localhost:5000/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customId, text })
    });

    const result = await response.json();

    if (result.error) {
      alert(result.error);
    } else {
      setText('');
      setCustomId('');
      navigate(`/note/${customId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (now a separate component) */}
      <Sidebar />

      {/* Right Main Section */}
      <div className="flex-1 p-8">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">📝 Shareable Notepad</h1>

          <button
            onClick={pasteText}
            className="mb-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Paste from Clipboard
          </button>

          <textarea
            placeholder="Paste or write your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
          />

          <input
            type="text"
            placeholder="Enter custom link name (e.g., ankit, notes123)"
            value={customId}
            onChange={(e) => setCustomId(e.target.value)}
            className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700"
          />

          <button
            onClick={saveNote}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition duration-200 font-semibold"
          >
            Save & Generate Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
