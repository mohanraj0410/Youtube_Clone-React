import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import Feeds from '../../components/Feeds'

const Home = ({ sideBarToggle }) => {

    const [category, setCategory] = useState(0)

    return (
        <>
            <SideBar sideBarToggle={sideBarToggle} category={category} setCategory={setCategory} />
            <div className={`container ${sideBarToggle ? "" : "large-container"}`}>
                <Feeds category={category} />
            </div>
        </>
    )
}

export default Home