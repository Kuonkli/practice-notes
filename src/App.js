import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NotesList from './components/NoteList';
import { getNotes, saveNote, deleteNote as dbDeleteNote } from './db';

function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isDBReady, setIsDBReady] = useState(false);

  // Инициализация и загрузка данных
  useEffect(() => {
    const init = async () => {
      try {
        const loadedNotes = await getNotes();
        setNotes(loadedNotes || []);
        setIsDBReady(true);
      } catch (error) {
        console.error('Ошибка загрузки заметок:', error);
      }
    };

    init();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Сохранение заметок в IndexedDB
  const addNote = async (note) => {
    try {
      await saveNote(note);
      setNotes([note, ...notes]);
    } catch (error) {
      console.error('Ошибка сохранения заметки:', error);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      await saveNote(updatedNote);
      setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    } catch (error) {
      console.error('Ошибка обновления заметки:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await dbDeleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Ошибка удаления заметки:', error);
    }
  };

  if (!isDBReady) {
    return <div className="app-loading">Загрузка приложения...</div>;
  }

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