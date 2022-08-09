import { Add, Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Adfab.css'
import { useStateContex } from "../store/StateProvider";

/////Check the CSS in PostForm.css

// export const  FabWrite = () => {
//     return (
//     <div className='addFab'>
//     <Link to='/addPost'>
//         <Fab  className='addPost__icon'>
//             <Edit className='addPost__add' />
//         </Fab>
//     </Link>
// </div>)
// }

export default function AdFab() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const { darkMode } = useStateContex();

  useEffect(() => {
    if (!user) setUser(null);
  }, [user]);

  return (

      <Link className={`addFab ${darkMode && "addFabDark"}`} to={user ? "/addPost" : "/auth"}>
         <Add className="addFab__add" />
      </Link>

  );
}
