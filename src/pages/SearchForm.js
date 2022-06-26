// import React, { useState } from 'react'
// import { SidebarData } from './OurV/SidebarData'


// const SearchForm = () => {
//     const [text, setText] = useState('beauty')

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     }

        

//     return (
//         <div>
//             {
//                 SidebarData.map((item, key) => {
//                     return (
//                         <form onSubmit={handleSubmit}>
//                             <input
//                                 key={key}
//                                 value={item.search}
//                                 type='text'
                                
//                                 onChange={(e) => setText(e.target.value)}
//                             />
//                             <button type='submit'>
//                                 Search
//                             </button>
//                         </form>
//                     )
//                 })}
//         </div>
//     )
// }

// export default SearchForm
