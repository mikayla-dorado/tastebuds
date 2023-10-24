import { useEffect, useState } from "react"
import { deletePost, editPost, getAllPosts, getPostByUserId } from "../../services/getAllPosts"
import { Link, useNavigate } from "react-router-dom"
import "./Post.css"


export const MyProfile = ({ currentUser }) => {
    const [posts, setPosts] = useState([])
    const userId = currentUser

    const navigate = useNavigate()


    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setPosts(postsArray)
        })
    }, [])

    const handleDelete = (postObj) => {
        deletePost(postObj)
    }

    const handleEdit = (postObj) => {
        editPost(postObj)
    }

    const refetchUserPosts = () => {
        getPostByUserId(userId).then(data => setPosts(data))
    }

    return (
        <div className="text-center">
            <header className="text-center">My Posts</header>
            <div className="myprofile border border-black bg-gradient-to-b from-orange-300 to-orange-100">
                {posts.filter((post) => post.userId === userId.id)
                    .map((post) => (
                        <div key={post.id}>
                            <Link to={`/post/${post.id}`} className="title text-center underline">{post.title}</Link>
                            <div className="postdetails-cuisine w-24">
                                {post?.cuisine?.type}
                            </div>
                            <div>
                                {post?.description}
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleDelete(post)
                                    refetchUserPosts()
                                }} 
                                className="mypost-delete border border-dashed border-red-500 w-24 bg-gray-100">Delete Post</button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleEdit(post)
                                    refetchUserPosts()
                                }} className="editpost bg-gray-100">Edit Post</button>
                            </div>
                        </div>
                    ))}
            </div>
            <div>
                <button onClick={() => {
                    navigate(`/newpost`)
                }}
                    className="newpost-btn my-2.5 border border mx-4">Create a New Post
                </button>
            </div>
        </div>
    )
}