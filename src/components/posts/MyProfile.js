import { useEffect, useState } from "react"
import { deletePost, editPost, getAllPosts, getPostByUserId } from "../../services/getAllPosts"
import { Link, useNavigate } from "react-router-dom"
import "./Post.css"
import myImg from "../../images/my-img.jpg"


export const MyProfile = ({ currentUser }) => {
    const [posts, setPosts] = useState([])
    const userId = currentUser

    const navigate = useNavigate()

    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setPosts(postsArray)
        })
    }, [])

    const handleDelete = async (postObj) => {
        try {
            await deletePost(postObj)
            // await refetchUserPosts()
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== postObj.id))
        } catch (error) {
            console.error('error deleting post:', error)
        }
    }

    const handleEdit = (postObj) => {
        editPost(postObj)
    }

    const refetchUserPosts = async () => {
        try {
            const data = await getPostByUserId(userId)
            setPosts(data)
        } catch (error) {
            console.error('error fetching user posts:', error)
        }
    }

    return (
        <div className="text-center min-h-screen" style={{ backgroundImage: `url(${myImg})` }}>
            <header className="text-center">My Posts</header>
            <article className="myprofile">
                {posts.filter((post) => post.userId === userId.id)
                    .map((post) => (
                        <div className="my-post border border rounded p-2 mb-4" key={post.id}>
                            <div className="mypost-cuisine">
                                {post?.cuisine?.type}
                            </div>
                            <div>
                            <Link to={`/post/${post.id}`} className="title underline">{post.title}</Link>
                            </div>
                            <div className="desc my-3">
                                {post?.description}
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleEdit(post)
                                    refetchUserPosts()
                                    navigate(`/editpost/${post.id}`)
                                }} className="editpost rounded bg-gray-100 hover:bg-red-400">Edit Post</button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleDelete(post)
                                }}
                                    className="mypost-delete border rounded bg-gray-100 w-20 h-12 hover:bg-red-400">Delete Post</button>
                            </div>
                        </div>
                    ))}
            </article>
            <div>
                <button onClick={() => {
                    navigate(`/newpost`)
                }}
                    className="newpost-btn my-2.5 border border rounded mx-4 text-gray-100 hover:bg-red-400">Create a New Post
                </button>
            </div>
        </div>
    )
}
