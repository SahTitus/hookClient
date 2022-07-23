import React from 'react'
import { useStateContex } from '../../store/StateProvider';
import style from "./CommentCard.module.css";

function CommentCard() {
  const { darkMode } = useStateContex();

  return (
    <div className={`${style.commentCard} ${darkMode && style.commentCardDark}`}>
      <h1>COMMENTS HERE</h1>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
      <h4>Bamm amm</h4>
    </div>
  )
}

export default CommentCard