import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import ErrorBoundary from '../errorBoundary'
// import ValidationError from '../ValidationError';
// import ErrorBoundary from '../errorBoundary'

export default class AddNote extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error.message };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()

    const newNote = {
      name: e.target['note-name'].value,
      description: e.target['note-content'].value,
      folder_id: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    console.log(newNote);

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'password'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folder_id}`)
      })
      .catch(error => {
        console.error({ error })
        this.setState(({ hasError: true }))
      })
  }


  render() {
    const { folders = [], } = this.context;
    if (this.state.hasError) {
      return <div className="errorNot">Please fill all fields: {this.state.error}</div>;
    }
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <ErrorBoundary>
          <NotefulForm onSubmit={this.handleSubmit}>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
            </label>

              <input type='text' id='note-name-input' name='note-name' />
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
            </label>
              <textarea id='note-content-input' name='note-content' />
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
            </label>
              <select id='note-folder-select' name='note-folder-id'>
                <option value={null}>...</option>
                {folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.title}
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>

              <button type='submit'>
                Add note
            </button>
            </div>
          </NotefulForm>
        </ErrorBoundary>
      </section>
    )
  }
}
