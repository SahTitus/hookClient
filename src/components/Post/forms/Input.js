import { TextareaAutosize } from '@mui/material'
import React from 'react'

function Input({placeholder, name, handleChange, type, autoFocus, multiline }) {
  return (
    <div>
          <div className="textField">
            <TextareaAutosize
              className='textArea'
              placeholder={placeholder}
              name={name}
              type={type}
              onChange={handleChange}
              autoFocus={autoFocus}
              multiline = {multiline}
              fullwidth = 'true'
               style={{marginTop: '20px',}}
            />
          </div>
    </div>
  )
}

export default Input