import React from 'react'
// import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({children}) {
    return (
        <div className='content glob-trans'>
            <Navbar/>
            {children}
            {/* <Footer/> */}
        </div>
    )
}