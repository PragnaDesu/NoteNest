let notes = JSON.parse(localStorage.getItem('notes') || '[]');

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const category = document.getElementById('category').value;

  if (!title || !content) {
    alert('Please fill in all fields.');
    return;
  }

  notes.push({ title, content, category });
  saveNotes();
  renderNotes();
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('category').value = '';
}

function deleteNote(index) {
  if (confirm('Are you sure you want to delete this note?')) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }
}

function renderNotes() {
  const container = document.getElementById('notes-container');
  const searchQuery = document.getElementById('search').value.toLowerCase();
  container.innerHTML = '';

  notes
    .filter(note =>
      note.title.toLowerCase().includes(searchQuery) ||
      note.content.toLowerCase().includes(searchQuery) ||
      (note.category && note.category.toLowerCase().includes(searchQuery))
    )
    .forEach((note, index) => {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note';

      noteDiv.innerHTML = `
        <button onclick="deleteNote(${index})">&times;</button>
        <h3>${note.title}</h3>
        <div class="category">${note.category || ''}</div>
        <p>${note.content}</p>
      `;
      container.appendChild(noteDiv);
    });
}

// Initial render
renderNotes();
