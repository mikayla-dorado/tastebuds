import { useEffect, useState } from "react"
import { deletePost, editPost, getAllPosts, getPostByUserId } from "../../services/getAllPosts"
import { Link, useNavigate } from "react-router-dom"
import "./Post.css"
import border from "../../images/picnic2.webp"


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
//style={{ backgroundImage: `url(${border})` }}
    return (
        <div className="text-center min-h-screen bg-cover" >
            <header className="text-center">My Posts</header>
            <article className="myprofile">
                {posts.filter((post) => post.userId === userId.id)
                    .map((post) => (
                        <div className="my-post border border rounded p-2 mb-4 bg-orange-200" key={post.id}>
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
                                }} className="pr-2"><i className="fa-solid fa-pen-to-square" /></button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleDelete(post)
                                }}
                                   ><i className="fa-solid fa-trash" /></button>
                            </div>
                        </div>
                    ))}
            </article>
            <div>
                <button onClick={() => {
                    navigate(`/newpost`)
                }}
                    className="newpost-btn my-2.5 border border rounded mx-4 text-gray-100 bg-lime-600 hover:bg-emerald-600">Create a New Post
                </button>
            </div>
        </div>
    )
}
