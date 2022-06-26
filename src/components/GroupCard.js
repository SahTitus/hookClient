import React from 'react'
import '../styles/GroupCard.css'

function GroupCard({image, groupName, description}) {
    return (
        <div className='groupCard'>
            <img src={image} alt='' />
            <div className="groupCardInfo">
                <h3
                    className="groupCardInfoTitle"
                >{groupName}
                </h3>
                <p className="groupCardInfoDesc" >
                    {description}
                </p>
            </div>
            <p className='groupCard__join'>
                <span>Join</span>
            </p>
        </div>
    )
}

export default GroupCard
