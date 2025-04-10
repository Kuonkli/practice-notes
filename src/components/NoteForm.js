import React, { useState, useEffect } from 'react';

function NoteForm({ addNote, currentNote, updateNote, setEditing }) {
    const [text, setText] = useState(currentNote ? currentNote.text : '');

    useEffect(() => {
        if (currentNote) {
            setText(currentNote.text);
        }
    }, [currentNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        if (currentNote) {
            updateNote({ ...currentNote, text });
            setEditing(null);
        } else {
            addNote({
                id: Date.now(),
                text,
                date: new Date().toLocaleString()
            });
        }
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
      <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст заметки..."
          required
          autoFocus
      />
            <div className="form-actions">
                <button type="submit" className="submit-btn">
                    {currentNote ? 'Обновить' : 'Добавить'}
                </button>
                {currentNote && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditing(null);
                            setText('');
                        }}
                        className="cancel-btn"
                    >
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
}

export default NoteForm;