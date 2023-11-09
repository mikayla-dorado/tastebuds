import { useEffect, useState } from "react"
import { getUserLikes } from "../../services/getUserLikes"
import { Link} from "react-router-dom"
import "./Post.css"
import "../../styles.css"


export const Post = ({  post }) => {
    const [userLikes, setUserLikes] = useState([])
    const [likes, setLikes] = useState([])
  

    useEffect(() => {
        getUserLikes().then((userLikesArray) => {
            setUserLikes(userLikesArray)
        })
    }, [])

    useEffect(() => {
        const chosenLike = likes.filter(
            (like) => like.postId === post.id
        )
        setLikes(chosenLike)
    }, [])


    return (
        <div className="individual-post w-auto bg-orange-200 ">
            <div>

            </div>
            <div className="allposts-title underline text-xl">
                <Link to={`/post/${post.id}`} >{post?.title} </Link>
            </div>
            <div className="post-cuisine ">
                {post?.cuisine?.type}
            </div>
            <div>
                    <img src={post?.imageURL} className="w-32 w-64 h-60 mx-auto border mb-2.5" />
                </div>
            <div className="post-description border-double w-60">
                {post?.description}
            </div>
        </div>
    )
}





