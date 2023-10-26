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
        <div className="text-center">
            <header className="text-center">My Posts</header>
            <article className="myprofile">
                {posts.filter((post) => post.userId === userId.id)
                    .map((post) => (
                        <div className="border border p-2 mb-4 bg-gradient-to-b from-orange-300 to-orange-100" key={post.id}>
                            <Link to={`/post/${post.id}`} className="title text-center underline">{post.title}</Link>
                            <div className="w-24 mx-2.5">
                                {post?.cuisine?.type}
                            </div>
                            <div>
                                {post?.description}
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleEdit(post)
                                    refetchUserPosts()
                                    navigate(`/editpost/${post.id}`)
                                }} className="editpost rounded bg-gray-100">Edit Post</button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleDelete(post)
                                    //refetchUserPosts()
                                }}
                                    className="mypost-delete border rounded bg-gray-100 w-20 h-12">Delete Post</button>
                            </div>
                        </div>
                    ))}
            </article>
            <div>
                <button onClick={() => {
                    navigate(`/newpost`)
                }}
                    className="newpost-btn my-2.5 border border mx-4 bg-cyan-500 hover:bg-cyan-600">Create a New Post
                </button>
            </div>
        </div>

    )
}