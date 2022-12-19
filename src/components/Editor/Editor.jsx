import React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import Showdown from "showdown";
import "./Editor.css";


export const Editor = (props) => {
  const { currentNote, updateNote } = props;
  const [selectedTab, setSelectedTab] = React.useState("preview");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote && currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={90}
        heightUnits="vh"
      />
    </section>
  );
};
