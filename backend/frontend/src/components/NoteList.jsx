import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notes', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err.response?.data?.error || 'Failed to fetch notes');
        if (err.response?.status === 401 || err.response?.status === 400) {
          localStorage.removeItem('token'); // Clear the invalid token
          window.location.href = '/login'; // Redirect to login page
        }
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note._id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{note.title}</h3>
          <p className="text-gray-700">{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;