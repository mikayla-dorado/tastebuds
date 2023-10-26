import "./Post.css"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../services/getAllPosts"
import { getUserLikesByPostId, removeUserPostLike, saveUserPostLike } from "../../services/getUserLikes"


export const PostDetails = ({ currentUser }) => {
    const { postId } = useParams()
    const [postLikes, setPostLikes] = useState([])
    const [post, setPost] = useState({})
    const [isLiked, setIsLiked] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getPostById(postId).then((data) => {
            const postObj = data[0]
            setPost(postObj)
        })
    }, [postId])

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
        if (isPostByCurrentUser()) {
            return (
             null
            );
          }
          if (isPostLiked()) {
            return null;
          } else {
            return (
              <button className="like-btn border-double rounded w-24 bg-cyan-500 hover:bg-cyan-600 text-gray-100" onClick={handleLikedPost}>
                Favorite Post
              </button>
            );
          }
    }

    const handleLikedPost = () => {
        if (!isLiked) {
            saveUserPostLike(post.id, currentUser.id)
            setIsLiked(true)
            navigate('/favorites')
        } else {
            //removeUserPostLike(post.id, currentUser.id)
            setIsLiked(false)
        }
    }

    useEffect(() => {
        setIsLiked(isPostLiked())
    }, [postLikes, currentUser])


    return (
        <div className="postdetails-container min-h-screen">
            <div className="postdetails-title text-center">
                {post?.title}
            </div>
            <div className="details bg-orange-100">
                <div className="postdetails-author">
                    <span>Written by: </span>
                    {post?.user?.name}
                </div>
                <div className="postdetails-cuisine text-gray-500">
                    {post?.cuisine?.type}
                </div>
                <div>
                  <img src={post?.imageURL} className="w-32 w-64 h-64 mx-auto" />
                </div>
                <div>
                    <div className="text-center mt-1">
                        <span>Ingredients:</span>
                    </div>
                    <div>
                        {post?.ingredients && post?.ingredients.split('. ').map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </div>
                </div>
                <div className="postdetails-body">
                    <div className="text-center">
                        <span>Directions:</span>
                    </div>
                    <div className="my-2.5">
                        {post?.body && post?.body.split('. ').map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                {renderLikeButton()}
            </div>
            {/* {isPostByCurrentUser() && (
                <button onClick={() => navigate(`/editpost/${post.id}`)} className="editpost-btn border-double w-24 bg-cyan-500 hover:bg-cyan-600 text-gray-100">Edit Post</button>
            )} */}

        </div>
    )
}
