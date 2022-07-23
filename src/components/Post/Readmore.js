import React from "react";
import "./styles.css";

export default function Arrow({ showIcon = true, open = true, handleClick }) {
  return (
    <>
      {showIcon &&
        (open ? (
          <div
            className={`${open ? "image rotate" : "image"}`}
            onClick={handleClick}
          >
            &uarr;
          </div>
        ) : (
          <div
            className={`${open ? "image rotate" : "image"}`}
            onClick={handleClick}
          >
            &darr;
          </div>
        ))}
    </>
  );
}
