import React, { useState, useEffect } from "react";

export default function EditorPage() {
  const [editors, setEditors] = useState([]);
  const [newEditor, setNewEditor] = useState("");
  const [editingEditor, setEditingEditor] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const apiUrl = "https://localhost:7246/api/Editor";

  // Fetch all editors
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setEditors(data))
      .catch((error) => console.error("Error fetching editors:", error));
  }, []);

  // Add a new editor
  const addEditor = () => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newEditor }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEditors([...editors, data]);
        setNewEditor("");
      })
      .catch((error) => console.error("Error adding editor:", error));
  };

  // Update an editor
  const updateEditor = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then(() => {
        setEditors(
          editors.map((editor) =>
            editor.id === id ? { ...editor, name: updatedName } : editor
          )
        );
        setEditingEditor(null);
        setUpdatedName("");
      })
      .catch((error) => console.error("Error updating editor:", error));
  };

  // Delete an editor
  const deleteEditor = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then(() => setEditors(editors.filter((editor) => editor.id !== id)))
      .catch((error) => console.error("Error deleting editor:", error));
  };

  return (
    <div>
      <h1>Editors</h1>
      <div>
        <input
          type="text"
          placeholder="Enter new editor name"
          value={newEditor}
          onChange={(e) => setNewEditor(e.target.value)}
        />
        <button onClick={addEditor}>Add Editor</button>
      </div>
      <ul>
        {editors.map((editor) => (
          <li key={editor.id}>
            {editingEditor === editor.id ? (
              <div>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <button onClick={() => updateEditor(editor.id)}>Save</button>
                <button onClick={() => setEditingEditor(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {editor.name}
                <button onClick={() => setEditingEditor(editor.id)}>
                  Edit
                </button>
                <button onClick={() => deleteEditor(editor.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
