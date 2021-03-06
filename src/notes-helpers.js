
export const findFolder = (folders = [], folder_id) =>
  folders.find(folder => folder_id === folder_id)

export const findNote = (notes = [], noteId) =>
  notes.find(note => note.id === parseInt(noteId))

export const getNotesForFolder = (notes = [], folder_id) => (
  (!folder_id)
    ? notes
    : notes.filter(note => parseInt(note.folder_id) === parseInt(folder_id))
)

export const countNotesForFolder = (notes = [], folder_id) =>
  notes.filter(note => parseInt(note.folder_id) === folder_id).length
