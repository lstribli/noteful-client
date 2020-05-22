import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  error: null,
  addFolder: () => { },
  addNote: () => { },
  deleteNote: () => { },
})
