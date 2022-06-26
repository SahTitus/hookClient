import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";

function Input({
  type,
  placeholder,
  toggleShowPassword,
  name,
  handleChange,
  autoFocus
}) {
  return (
    <div className="login__inputOption">
      <input
      autoFocus={autoFocus}
        className="login__formInput"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
      />
      {name === "password" && (
        <IconButton onClick={toggleShowPassword}>
          {type === "password" ? <VisibilityOff className='showPassword'/> : <Visibility className='showPassword'/>}
        </IconButton>
      )}
    </div>
  );
}

export default Input;
