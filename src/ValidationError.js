import React from 'react'

export default class ValidationError extends React.Component {
  state = { error: null };

  static getDerivedStateFormError(error) {
    return (error)
  }
  render() {
    if (this.state.error) {
      return (
        <main className="error-page">
          <h1>Something went wrong</h1>
          <p>Try refreshing the page</p>
        </main>
      )
    }
    //otherwise render the children
    return this.props.children
  }
}