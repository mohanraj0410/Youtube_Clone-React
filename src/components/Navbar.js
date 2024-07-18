import React, { useState } from 'react'
import menu_icon from "../assets/menu.png"
import logo from "../assets/logo.png"
import search_icon from "../assets/search.png"
import upload from "../assets/upload.png"
import more from "../assets/more.png"
import notification from "../assets/notification.png"
import profile_icon from "../assets/jack.png"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addInputData } from '../Redux/storeSlice'

const Navbar = ({ setSideBarToggle }) => {

    const [input, setInput] = useState("")

    const dispatch = useDispatch()

    const handleSearch = () => {
        dispatch(addInputData(input))
    }

    return (
        <>
            <nav className='flex-div'>
                <div className='nav-left flex-div'>
                    <img src={menu_icon} onClick={() => setSideBarToggle(prev => prev == true ? false : true)} className='menu_icon' alt='menu_icon' />
                    <Link to={'/'}><img src={logo} className='logo' alt='logo' /></Link>
                </div>
                <div className='nav-middle flex-div'>
                    <iv className='search_box flex-div'>
                        <input type='text' placeholder='Search' onChange={(e) => setInput(e.target.value)} />
                        <img src={search_icon} alt='search_icon' onClick={handleSearch} />
                    </iv>
                </div>
                <div className='nav-right flex-div'>
                    <abbr title="Shorts">
                        <img src={upload} alt='upload' />
                    </abbr>
                    <abbr title="More">
                        <img src={more} alt='more' />
                    </abbr>
                    <abbr title="Notification">
                        <img src={notification} alt='notification' />
                    </abbr>
                    <abbr title="User">
                        <img src={profile_icon} className='user-icon' alt='profile_icon' />
                    </abbr>


                </div>
            </nav>
        </>
    )
}

export default Navbar