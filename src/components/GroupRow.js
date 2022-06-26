import { KeyboardArrowRight } from "@mui/icons-material";
import React from 'react'
import '../styles/GroupRow.css'

function GroupRow({image, title}) {
    return (
        <div className='groupRow'>
            <div className="groupRow__left">
                <img src={image} alt=''/>
                <p>{title}</p>
            </div>
            <KeyboardArrowRight className="groupRow__arrowIcon" />
        </div>
    )
}

export default GroupRow
