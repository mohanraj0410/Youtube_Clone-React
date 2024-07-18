import React from 'react'
import PlayVideo from '../../components/PlayVideo'
import Recommended from '../../components/Recommended'
import { useParams } from 'react-router'

const VideoPlayer = () => {

    const { categoryId } = useParams()
    return (
        <div className='play-container'>
            <PlayVideo />
            <Recommended categoryId={categoryId} />
        </div>
    )
}

export default VideoPlayer