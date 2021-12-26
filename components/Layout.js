import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function Layout({children}) {
    return (
        <div className='content glob-trans'>
            <Navbar/>
            <Sidebar />
            {children}
            <Footer/>
        </div>
    )
}