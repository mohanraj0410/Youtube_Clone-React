import React, { useEffect, useRef, useState } from 'react'
import like from "../assets/like.png"
import dislike from "../assets/dislike.png"
import share from "../assets/share.png"
import save from "../assets/save.png"
import user_profile from "../assets/user_profile.jpg"
import { API_KEY, value_converter } from '../data'
import moment from 'moment'
import { useParams } from 'react-router'

const PlayVideo = () => {

    const topDiv = useRef(null)

    const [apiData, setApiData] = useState(null)
    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState([])

    const { videoId } = useParams()

    const fetchData = async () => {
        if (topDiv.current) {
            topDiv.current.scrollIntoView({ behavior: 'smooth' })
        }
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(url)
            .then(res => res.json())
            .then(data => setApiData(data.items[0]))
    }

    const fetchVideoData = async () => {
        if (!apiData) return
        const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(url)
            .then(res => res.json())
            .then(data => setChannelData(data.items[0]))
    }

    const fetchCommentData = async () => {
        const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        await fetch(url)
            .then(res => res.json())
            .then(data => setCommentData(data.items))
    }

    useEffect(() => {
        fetchData()
    }, [videoId])

    useEffect(() => {
        fetchVideoData()
        fetchCommentData()
    }, [apiData])

    // console.log(commentData)


    return (
        <>
            <div ref={topDiv} style={{ marginTop: "-100px" }}></div>
            <div className='play-video'>
                <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <h3>{apiData?.snippet.title}</h3>
                <div className='play-video-info'>
                    <p>{value_converter(apiData?.statistics.viewCount)} views &bull; {moment(apiData?.snippet.publishedAt).fromNow()}</p>
                    <div>
                        <span><img src={like} alt='like' />{value_converter(apiData?.statistics.likeCount)}</span>
                        <span><img src={dislike} alt='dislike' /></span>
                        <span><img src={share} alt='share' />Share</span>
                        <span><img src={save} alt='save' />Save</span>
                    </div>
                </div>
                <hr />
                <div className='publisher'>
                    <img src={channelData?.snippet.thumbnails.default.url} alt='thumbnail' />
                    <div>
                        <p>{apiData?.snippet.channelTitle}</p>
                        <span>{value_converter(channelData?.statistics.subscriberCount)} Subscribers</span>
                    </div>
                    <button>Subscribe</button>
                </div>
                <div className='video-discription'>
                    <p>{apiData?.snippet.description.slice(0, 500)}</p>
                    <hr />
                    <h4>{value_converter(apiData?.statistics.commentCount)} Comments</h4>
                    {
                        commentData.map((item, index) => {
                            return (
                                <div key={index} className='comments'>
                                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl ? item.snippet.topLevelComment.snippet.authorProfileImageUrl : user_profile} alt='user_profile' />
                                    <div>
                                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                        <div className='comment-actions'>
                                            <img src={like} alt='like' />
                                            <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                            <img src={dislike} alt='dislike' />
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PlayVideo