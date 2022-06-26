import React from "react";
import style from "../styles/Reactions.module.css";

function Reactions({ selectReaction }) {
  const items = [
    { id: "Like", label: "👍" },
    { id: "Love", label: "💝" },
    { id: "Angry", label: "😡" },
    { id: "Fire", label: "🔥" },
    { id: "Lol", label: "😂" },
    { id: "Nice", label: "👌" },
    { id: "Wow", label: "😲" },
  ];

  console.log(items);
  return (
    <div className={style.reactions}>
      {items.map((item) => (
        <di>
          <span className={style.emojiLabel}>{item.id}</span>
          <button onClick={() => selectReaction(item)} className={style.emoji}>
            {item.label}
          </button>
        </di>
      ))}
    </div>
  );
}

export default Reactions;
