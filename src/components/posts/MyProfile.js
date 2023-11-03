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
            <header className="myposts text-center">My Posts</header>
            <article className="myprofile">
                {posts.filter((post) => post.userId === userId.id)
                    .map((post) => (
                        <div className="my-post border  h-48 rounded p-2 mb-4 bg-orange-200" key={post.id}>
                            <div className="mypost-cuisine">
                                {post?.cuisine?.type}
                            </div>
                            <div>
                                <Link to={`/post/${post.id}`} className="title underline text-center">{post.title}</Link>
                            </div>
                            <div className="desc my-3 w-full">
                                {post?.description}
                            </div>
                            <div className="btn-container">
                                <button onClick={() => {
                                    handleEdit(post)
                                    refetchUserPosts()
                                    navigate(`/editpost/${post.id}`)
                                }} className="pr-2"><i className="fa-solid fa-pen-to-square" />
                                </button>
                            </div>
                            <div className="btn-container ">
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
                    className="newpost-btn my-2.5  rounded mx-4 px-1 py-1 hover:bg-orange-700">Create a New Post
                </button>
            </div>
        </div>
    )
}
