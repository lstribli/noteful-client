import React from 'react'
import './NotefulForm.css'
import ErrorBoundary from '../errorBoundary'

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (
    <ErrorBoundary>
      <form

        className={['Noteful-form', className].join(' ')}
        action='#'
        {...otherProps}
      /></ErrorBoundary>
  )
}
