import { useEffect, useState } from "react"
import { getUserLikes } from "../../services/getUserLikes"
import { Link } from "react-router-dom"


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
    <div>
        <header>title: </header>
        <div>
        <Link to={`/post/${post.id}`} >{post?.title} </Link>
        </div>
        <div className="post-cuisine">
            {post?.cuisine?.type}
        </div>
        <div className="post-description">
            {post?.description}
        </div>
    </div>
)

}

//not sure if this is all i need here