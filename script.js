const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesContainer = document.getElementById("notesContainer");

// API base URL
const API_URL = "http://localhost:5000/api/notes";

// Fetch all notes from backend
async function fetchNotes() {
  notesContainer.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    const notes = await res.json();

    notes.forEach((note) => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");

      noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
      `;
      notesContainer.appendChild(noteDiv);
    });
  } catch (err) {
    console.error("Error fetching notes:", err);
  }
}

// Add a new note
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newNote = {
    title: titleInput.value,
    content: contentInput.value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });

    if (res.ok) {
      titleInput.value = "";
      contentInput.value = "";
      fetchNotes();
    }
  } catch (err) {
    console.error("Error adding note:", err);
  }
});

// Delete a note
async function deleteNote(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchNotes();
    }
  } catch (err) {
    console.error("Error deleting note:", err);
  }
}

// Initial load
fetchNotes();
