import { useEffect, useState } from "react"
import { deletePost, getAllPosts, getPostByUserId } from "../../services/getAllPosts"
import { Link } from "react-router-dom"
import "./Post.css"


export const MyProfile = ({ currentUser }) => {
    const [posts, setPosts] = useState([])
    const userId = currentUser


    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setPosts(postsArray)
        })
    }, [])


    const handleDelete = (postObj) => {
        deletePost(postObj)
    }

    const refetchUserPosts = () => {
        getPostByUserId(userId).then(data => setPosts(data))
    }

    return (
        <div>
            <header className="text-center">My Posts</header>
            <div className="border border-black">
                {posts.filter((post) => post.userId === userId.id)
                    .map((post) => (
                        <div key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                            <div className="postdetails-cuisine w-24 ">
                                {post?.cuisine?.type}
                            </div>
                            <div>
                                {post?.details}
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleDelete(post)
                                    refetchUserPosts()
                                }} className="mypost-delete border border-black w-24 bg-gray-100">Delete Post</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )

}