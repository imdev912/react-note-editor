import React from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Editor } from "./components/Editor/Editor";
import "./styles.css";

export default function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  const createNote = () => {
    const note = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    };
    setNotes((prevNotes) => [note, ...prevNotes]);
    setCurrentNoteId(note.id);
  };

  const updateNote = (text) => {
    setNotes((prevNotes) => {
      const updatedNotes = [];

      for (const note of prevNotes) {
        if (note.id === currentNoteId) {
          updatedNotes.unshift({ ...note, body: text });
        } else {
          updatedNotes.push(note);
        }
      }

      return updatedNotes;
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <Split
      className="split"
      sizes={[30, 70]}
      minSize={[200, 500]}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
    >
      <Sidebar
        createNote={createNote}
        notes={notes}
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
        deleteNote={deleteNote}
      />

      {notes && notes.length > 0 && (
        <Editor
          currentNote={
            notes.find((note) => note.id === currentNoteId) || notes[0]
          }
          updateNote={updateNote}
        />
      )}
    </Split>
  );
}
