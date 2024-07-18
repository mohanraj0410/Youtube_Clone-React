import React, { useEffect, useState } from 'react'
import { API_KEY, value_converter } from '../data'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Recommended = ({ categoryId }) => {

    const [apiData, setApiData] = useState([])

    const fetchData = async () => {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=In&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(url)
            .then(res => res.json())
            .then(data => setApiData(data.items))
    }

    useEffect(() => {
        fetchData()
    }, [])

    // console.log((apiData));

    return (
        <div className='recommended'>
            {
                apiData?.map((item, index) => {
                    return (
                        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='side-video-list'>
                            <img src={item.snippet.thumbnails.medium.url} alt='thumbnail1' />
                            <div className='video-info'>
                                <h4>{item.snippet.title.slice(0,50)}...</h4>
                                <p>{item.snippet.channelTitle}</p>
                                <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Recommended;