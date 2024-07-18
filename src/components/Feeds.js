import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../data'
import moment from 'moment'
import Shimmer from './Shimmer'
import { useSelector } from 'react-redux'

const Feeds = ({ category }) => {

    const query = useSelector((store) => store.input.input)

    const topDiv = useRef(null)

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const fetchData = async () => {
        setIsLoading(true)
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=In&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data.items || [])
                setIsLoading(false)
            })
    }

    const fetchSearchData = async () => {
        setIsLoading(true)
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&type=video&key=${API_KEY}`
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data.items || [])
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (query) {
            fetchSearchData()
        }
    }, [query])


    useEffect(() => {
        fetchData()
    }, [category])

    // console.log(data);


    return (
        <>
            <div ref={topDiv}></div>
            <div className='feeds'>
                {
                    isLoading ? (
                        Array(10).fill().map((_, index) => <Shimmer key={index} />)
                    ) : (
                        data.map((item, index) => (
                            <Link key={index}
                                to={item.snippet.categoryId ? `/video/${item.snippet.categoryId}/${item.id}` : `/video/${item.id.videoId}`}
                                className='card'>
                                <img src={item.snippet.thumbnails.medium.url} alt='thumbnail' />
                                <h2>{item.snippet.title.slice(0, 50)}...</h2>
                                <h3>{item.snippet.channelTitle}</h3>
                                <p>
                                    {item.statistics ? `${value_converter(item.statistics.viewCount)} views •` : ""} {moment(item.snippet.publishedAt).fromNow()}
                                </p>
                            </Link>
                        ))
                    )
                }
            </div>
        </>
    )
}

export default Feeds
