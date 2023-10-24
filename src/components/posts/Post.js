import { useEffect, useState } from "react"
import { getUserLikes, getUserLikesByPostId, removeUserPostLike, saveUserPostLike } from "../../services/getUserLikes"
import { Link, useParams } from "react-router-dom"
import "./Post.css"


export const Post = ({ currentUser }) => {
    const [userLikes, setUserLikes] = useState([])
    const [likes, setLikes] = useState([])
    const [postLikes, setPostLikes] = useState([])
    const [post, setPost] = useState({})
    const [isLiked, setIsLiked] = useState(false)

    const { postId } = useParams()


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


    useEffect(() => {
        getUserLikesByPostId(postId).then((data) => {
            const likesObj = data
            setPostLikes(likesObj)
        })
    }, [postId])


    const isPostByCurrentUser = () => {
        return currentUser && post.user && post.user.id === currentUser.id
    }

    const isPostLiked = () => {
        return postLikes.some(like => like.userId === currentUser.id && like.postId === post.id)
    }

    const renderLikeButton = () => {
        if (isPostLiked()) {
            return null
        } else {
            return (
                <button className="like-btn border-double w-24 bg-blue-700 text-gray-100" onClick={handleLikedPost}>Favorite Post</button>
            )
        }

    }

    const handleLikedPost = () => {
        if (!isLiked) {
            saveUserPostLike(post.id, currentUser.id)
            setIsLiked(true)
        } else {
            removeUserPostLike(post.id, currentUser.id)
            setIsLiked(false)
        }
    }

    useEffect(() => {
        setIsLiked(isPostLiked())
    }, [postLikes, currentUser])


    return (
        <div className="individual-post bg-gradient-to-b from-orange-300 to-orange-100 border text-gray-700">

            <div className="allposts-title underline">
                <Link to={`/post/${post.id}`} >{post?.title} </Link>
            </div>
            <div className="post-cuisine">
                {post?.cuisine?.type}
            </div>
            <div className="post-description border-double w-60">
                {post?.description}
            </div>

            <div>
                {renderLikeButton()}
            </div>

            {/* {isPostByCurrentUser() && (
                <button onClick={() => navigate(`/editpost/${post.id}`)} className="editpost-btn border-double w-24 bg-blue-700 text-gray-100">Edit Post</button>
            )} */}

        </div>
    )
}

