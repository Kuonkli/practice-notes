import React from 'react';

function Note({ note, deleteNote, setEditing }) {
    return (
        <div className="note">
            <div className="note-content" onClick={() => setEditing(note)}>
                <p>{note.text.length > 230 ? (note.text.slice(0, 230) + "...") : note.text}</p>
                <small>Создано: {note.date}</small>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                }}
                className="delete-btn"
                aria-label="Удалить заметку"
            >
                ×
            </button>
        </div>
    );
}

export default Note;