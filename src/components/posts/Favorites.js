import { useEffect, useState } from "react"
import { getUserLikes, deleteLike } from "../../services/getUserLikes"
import { getAllPosts } from "../../services/getAllPosts"
import { Post } from "./Post"


export const Favorites = ({ currentUser, post }) => {
    const [userLikes, setUserLikes] = useState([])
    const [posts, setPosts] = useState([])
    const [filteredUserLikes, setFilteredUserLikes] = useState([])
    const [favoritePosts, setFavoritePosts] = useState([])
    const [loading, setLoading] = useState(true)


    const getAndSetUserLikes = () => {
        getUserLikes().then((userLikesArray) => {
            setUserLikes(userLikesArray)
            console.log(userLikes)
        })
    }

    useEffect(() => {
        getAndSetUserLikes()
    }, [])

    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setPosts(postsArray)
            console.log(posts)
        })
    }, [])

    useEffect(() => {
        const filterUserLikes = userLikes.filter(like =>
            like.userId === currentUser.id)
        setFilteredUserLikes(filterUserLikes)
    }, [currentUser, userLikes])



    useEffect(() => {
        // const postIdArray = filteredUserLikes.map(item => item.postId)
        // const filteredPosts = posts.filter(post => postIdArray.includes(post.id))
        // setFavoritePosts(filteredPosts)
        // setLoading(false)

        const postIdsLikedByUser = filteredUserLikes.map(item => item.postId)
        const likedPosts = posts.filter(post => postIdsLikedByUser.includes(post.id))
        setFavoritePosts(likedPosts)
        console.log(likedPosts)
        console.log(postIdsLikedByUser)
        setLoading(false)
    }, [currentUser, filteredUserLikes, posts])

    const handleDelete = (post) => {
        const toDeleteLike = filteredUserLikes.find(like => like.postId === post.id)
        deleteLike(toDeleteLike)
        getAndSetUserLikes()
    }

    //need to filter through userLikes since it is a join table and not a component of the posts themselves


    console.log(posts) //array of objects filled with all post info
    console.log(userLikes) //starts out as an empty array then becomes an array of objects with post and userlikes info
    console.log(favoritePosts) //empty array


    return (

        <div className="favorites-container">
            <div className="posts">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    favoritePosts.map((post) => (
                        <div key={post.id}>
                            <Post post={post} />
                            <div className="delete-like">
                                <button
                                    className="delete-like-btn"
                                    onClick={() => {
                                        handleDelete(post);
                                    }}
                                >
                                    Delete Favorite
                                </button>
                            </div>
                        </div>

                    ))
                )}
            </div>
        </div>
        
    )

}