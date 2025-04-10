import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NotesList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Сохранение заметок в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([note, ...notes]);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
      <div className="app">
        <header>
          <h1>Мои заметки</h1>
          {!isOnline && <div className="offline-banner">Офлайн-режим</div>}
        </header>

        <main>
          <NoteForm
              addNote={addNote}
              currentNote={editing}
              updateNote={updateNote}
              setEditing={setEditing}
          />
          <NotesList
              notes={notes}
              deleteNote={deleteNote}
              setEditing={setEditing}
          />
        </main>
      </div>
  );
}

export default App;