import { Avatar } from "@mui/material";
import { Link } from 'react-router-dom'
import { useStateContex } from "../store/StateProvider";
import '../styles/Chat.css'

function Chat
({ username, addNewChat, message, image, timestamp }) {
    const { darkMode } = useStateContex();


    return  (
        <Link to='/chatRoom' >
            <div className={`chat ${darkMode && 'chatDark'}`}>
                <Avatar className='chat__avatar' src={''}>
                    {username.charAt(0)}
                </Avatar>
                <div className='chat__text'>
                    <div className='chat__textInfo'>
                        <h4>{username}</h4>
                        <p>{message}</p>
                    </div>
                    <p className='chat__timestamp'>{timestamp}</p>
                </div>
            </div>
        </Link>
    ) 
}

export default Chat
