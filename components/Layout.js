import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Cart from './cart/Cart'
import Footer from './Footer'

export default function Layout({children}) {
    return (
        <div className='content glob-trans'>
            <Navbar/>
            <Sidebar />
            <Cart />
            {children}
            <Footer/>
        </div>
    )
}