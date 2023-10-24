import "./Post.css"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../services/getAllPosts"
import { getUserLikesByPostId, removeUserPostLike, saveUserPostLike } from "../../services/getUserLikes"


export const PostDetails = () => {
    const { postId } = useParams()
    const [postLikes, setPostLikes] = useState([])
    const [post, setPost] = useState({})
    const [isLiked, setIsLiked] = useState(false)


    useEffect(() => {
        getPostById(postId).then((data) => {
            const postObj = data[0]
            setPost(postObj)
        })
    }, [postId])




    return (
        <div className="postdetails-container min-h-screen">
            <div className="postdetails-title text-center">
                {post?.title}
            </div>
            <div className="postdetails-author">
                <span>Written by: </span>
                {post?.user?.name}
            </div>
            <div className="postdetails-cuisine w-24 ">
                {post?.cuisine?.type}
            </div>
            <div>
                {post?.details}
            </div>
            <div className="details bg-orange-100">
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
                    {post?.body && post?.body.split('. ').map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
            </div>
            

        </div>
    )
}