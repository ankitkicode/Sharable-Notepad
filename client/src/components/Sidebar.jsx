import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const fetchNotes = () => {
    fetch('http://localhost:5000/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data.notes))
      .catch((err) => console.error('Failed to load notes:', err));
  };

  useEffect(() => {
    fetchNotes();

    // Optional: Refresh list every 30 seconds
    const interval = setInterval(fetchNotes, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-1/4 bg-white p-4 border-r shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">📋 Available Notes</h2>
      <ul className="space-y-2 max-h-[80vh] overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-sm">No notes available</p>
        ) : (
          notes.map((note) => (
            <li
              key={note.customId}
              onClick={() => navigate(`/note/${note.customId}`)}
              className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100 text-blue-600 truncate"
              title={note.text}
            >
              {note.customId}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
