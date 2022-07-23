import React from 'react'
import { useStateContex } from '../../store/StateProvider';
import style from "./Loadash.module.css";

function Spinner() {
  const { darkMode } = useStateContex();

  return (
  <div className={`${style.spin} ${darkMode && style.spinDark}`}>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
  )
}

export default Spinner