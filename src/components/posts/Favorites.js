import { useEffect, useState } from "react"
import { getUserLikes, deleteLike } from "../../services/getUserLikes"
import { getAllPosts } from "../../services/getAllPosts"
import { Post } from "./Post"
import NoFavorites from "../../images/no-favorites.jpg"


export const Favorites = ({ currentUser }) => {
    const [userLikes, setUserLikes] = useState([])

    const getAndSetUserLikes = () => {
        getUserLikes(currentUser.id).then((userLikesArray) => {
            setUserLikes(userLikesArray)
        })
    }

    useEffect(() => {
        getAndSetUserLikes()
    }, [currentUser])


    const handleDelete = (userLike) => {
        deleteLike(userLike).then(() => {
            setUserLikes((prevUserLikes) => {
                return prevUserLikes.filter((like) => like.id !== userLike.id)
            })
        })
    }


    return (<>
        {userLikes.length === 0 ? (
            <div>
                <img src={NoFavorites} alt="pn cle" className="img h-96 rounded fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
        ) : (
            <div className="favorites-container">
                {userLikes.map((userLike) => (
                    <div className="posts" key={userLike.id}>
                        <div className="fav-cuisine">
                            {userLike?.post?.cuisine?.type}
                        </div>
                        <div className="fav-title">
                            {userLike?.post?.title}
                        </div>
                        <div className="fav-description">
                            {userLike?.post?.description}
                        </div>
                        <div className="delete-like">
                            <button
                                className="delete-like-btn border border-double my-2.5 px-1"
                                onClick={() => {
                                    handleDelete(userLike);
                                }}
                            >
                                Delete Favorite
                            </button>
                        </div>

                    </div>

                )
                )}
            </div>
        )}
        </>
    )
}