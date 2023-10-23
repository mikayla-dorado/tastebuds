import { useEffect, useState } from "react"
import { getUserLikes } from "../../services/getUserLikes"
import { Link } from "react-router-dom"
import "./Post.css"


export const Post = ({post}) => {
    const [userLikes, setUserLikes] = useState([])
    const [likes, setLikes] = useState([])


useEffect(() => {
    getUserLikes().then((userLikesArray) => {
        setUserLikes(userLikesArray)
    })
}, [])

useEffect(() => {
    const chosenLike = likes.filter(
        (like) => like.postId === postMessage.id
    )
    setLikes(chosenLike)
}, [])


return (
    <div className="individual-post bg-orange-300 border text-gray-700">
        
        <div className="allposts-title underline">
        <Link to={`/post/${post.id}`} >{post?.title} </Link>
        </div>
        <div className="post-cuisine">
            {post?.cuisine?.type}
        </div>
        <div className="post-description border-double w-60">
            {post?.description}
        </div>
    </div>
)
}

//not sure if this is all i need here