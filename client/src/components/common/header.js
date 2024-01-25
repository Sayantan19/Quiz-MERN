import React from 'react'

//Header component
export default function Header(props) {
    return <header className='text-white px-4' id="Head">
        <div className="container py-2" id="heading"><h1>{props.name}</h1></div>
    </header>
}

