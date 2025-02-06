import React from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

const Home = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6">Notes</h1>
    <NoteForm onNoteCreated={() => window.location.reload()} />
    <NoteList />
  </div>
);

export default Home;