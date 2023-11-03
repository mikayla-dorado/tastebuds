import { useEffect, useState } from "react"
import { getUserLikes, deleteLike } from "../../services/getUserLikes"
import NoFavorites from "../../images/no-favorites.jpg"
import fav from "../../images/picnic2.webp"
import "./Favorites.css"


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
            <div className="favorites-container min-h-screen bg-cover" >
                {userLikes.map((userLike) => (
                    <div className="posts bg-orange-200 border rounded-md text-lg h-36" key={userLike.id}>
                        <div className="fav-cuisine">
                            {userLike?.post?.cuisine?.type}
                        </div>
                        <div className="fav-title ">
                            {userLike?.post?.title}
                        </div>
                        <div className="fav-description">
                            {userLike?.post?.description}
                        </div>
                        <div className="delete-like">
                            <button
                                className="delete-like-btn pt-1.5"
                                onClick={() => {
                                    handleDelete(userLike);
                                }}
                            >
                                <i className="fa-solid fa-trash" />
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

//style={{ backgroundImage: `url(${fav})` }}