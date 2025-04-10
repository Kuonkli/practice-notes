import { openDB } from 'idb';

const DB_NAME = 'notesDB';
const STORE_NAME = 'notes';
const DB_VERSION = 1;

async function initDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        },
    });
}

export async function getNotes() {
    const db = await initDB();
    return db.getAll(STORE_NAME);
}

export async function saveNote(note) {
    const db = await initDB();
    return db.put(STORE_NAME, note);
}

export async function deleteNote(id) {
    const db = await initDB();
    return db.delete(STORE_NAME, id);
}

export async function clearNotes() {
    const db = await initDB();
    return db.clear(STORE_NAME);
}