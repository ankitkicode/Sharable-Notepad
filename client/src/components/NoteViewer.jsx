import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // ✅ Import Sidebar

const NoteViewer = () => {
  const { customId } = useParams();
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`http://localhost:5000/note/${customId}`);
      if (response.ok) {
        const data = await response.json();
        setNoteText(data.text);
      } else {
        setNoteText('⚠️ Note not found');
      }
    };
    fetchNote();
  }, [customId]);

  const copyText = () => {
    navigator.clipboard.writeText(noteText);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8 flex justify-center ">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-10">📄 Your Note</h1>

          <textarea
            readOnly
            value={noteText}
            className="w-full h-84 p-4 border rounded-lg text-gray-800 bg-gray-100 resize-none focus:outline-none"
          />

          <button
            onClick={copyText}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 font-semibold"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;
