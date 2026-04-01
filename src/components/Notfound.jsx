import React from 'react'
import '../css/Notfound.css'

//  ./ - Represents the first folder in src (url prompts the import function to go back a step backward)
//  ../ - Represents the second folder in src (url prompts the import function to go back two steps backward)
// ../../ - To import from the sokogarden

const Notfound = () => {
return (
    <div className='Notfound'>
        <h1>Sorry page not found</h1>
        <h1>404</h1>
        <a href="/">Back Home</a>
    </div>
)
}

export default Notfound
