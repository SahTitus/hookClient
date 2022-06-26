import { Fab } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';



/////Check the CSS in PostForm.css

export const  FabWrite = () => {
    return (
    <div className='addFab'>
    <Link to='/postForm'>
        <Fab  className='addPost__icon'>
            <Edit className='addPost__add' />
        </Fab>  
    </Link>
</div>)
}

export default function AdFab() {
    return (
        <div className='addFab'>
            <Link to='/postForm'>
            <Fab className='addFab__icon'>
                    <Add className='addFab__add'/>
                </Fab>
            </Link>
        </div>
    )
}

