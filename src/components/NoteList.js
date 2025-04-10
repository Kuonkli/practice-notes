import React from 'react';
import Note from './Note';

function NotesList({ notes, deleteNote, setEditing }) {
    return (
        <div className="notes-list">
            {notes.length === 0 ? (
                <div className="empty-state">
                    <p>Нет заметок. Добавьте первую!</p>
                </div>
            ) : (
                notes.map(note => (
                    <Note
                        key={note.id}
                        note={note}
                        deleteNote={deleteNote}
                        setEditing={setEditing}
                    />
                ))
            )}
        </div>
    );
}

export default NotesList;