import { useEffect, useState } from "react"
import { getUserLikes, deleteLike } from "../../services/getUserLikes"
import { getAllPosts } from "../../services/getAllPosts"
import { Post } from "./Post"


export const Favorites = ({ currentUser }) => {
    const [userLikes, setUserLikes] = useState([])
    const [posts, setPosts] = useState([])
    const [filteredUserLikes, setFilteredUserLikes] = useState([])
    const [favoritePosts, setFavoritePosts] = useState([])


    const getAndSetUserLikes = () => {
        getUserLikes().then((userLikesArray) => {
            setUserLikes(userLikesArray)
            console.log(userLikesArray)
        })
    }

    useEffect(() => {
        getAndSetUserLikes()
    }, [])

    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setPosts(postsArray)
        })
    }, [])

    useEffect(() => {
        const filterUserLikes = userLikes.filter(like =>
            like.userId === currentUser.id)
        setFilteredUserLikes(filterUserLikes)
    }, [currentUser, userLikes])


    useEffect(() => {
        const postIdArray = filteredUserLikes.map(item => item.postId)
        const filteredPosts = posts.filter(post => postIdArray.includes(post.id))
        setFavoritePosts(filteredPosts)
    }, [currentUser, filteredUserLikes, posts])

    const handleDelete = (post) => {
        const toDeleteLike = filteredUserLikes.find(like => like.postId === post.id)
        deleteLike(toDeleteLike)
        getAndSetUserLikes()
    }

    return (
        <div className="favorites-container">
            <div className="posts">
                {favoritePosts.map((post) => {
                    return (
                        <div key={post.id}>
                            <Post post={post} />
                            <div className="delete-like">
                                <button className="delete-like-btn"
                                    onClick={() => {
                                        handleDelete(post)
                                    }}>
                                    Delete Favorite
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}