import React from "react";
import "./Sidebar.css";


export const Sidebar = (props) => {
  const {
    createNote,
    notes,
    currentNoteId,
    setCurrentNoteId,
    deleteNote
  } = props;

  return (
    <nav className="sidebar">
      <div className="sidebar--head">
        <h3>My Notes</h3>
        <button className="sidebar--action add-note" onClick={createNote}>
          +
        </button>
      </div>

      <div className="sidebar--body">
        {notes.map((note) => {
          return (
            <div
              key={note.id}
              id={note.id}
              className={`note-summary ${
                currentNoteId && note.id === currentNoteId ? "selected" : ""
              }`}
              onClick={() => setCurrentNoteId(note.id)}
            >
              <div className="text-snippet">{note.body.split("\n")[0]}</div>

              <button
                className="delete-note"
                onClick={() => deleteNote(note.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
