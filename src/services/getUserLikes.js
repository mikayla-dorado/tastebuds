export const getUserLikes = () => {
    return fetch(`http://localhost:8088/userLikes/?userId=1&_expand=post&_expand=user`).then(
        (res) => res.json()
    )
}

export const getUserLikesByPostId = (postId) => {
    return fetch(`http://localhost:8088/userLikes?_expand=postId=${postId}`).then(
        (res) => res.json()
    )
}

export const saveUserPostLike = (post) => {
    const userPostLike = {
        userId: parseInt(localStorage.getItem("learning_user").slice(6, 7)),
        postId: post.id
    }
    return fetch("http://localhost:8088/userLikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userPostLike),
    }).then((res) => res.json())
}

export const removeUserPostLike =(postId, userId) => {
    return fetch(`http://localhost:8088/posts/${postId}/userLikes/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify()
    })
}

export const deleteLike = (like) => {
    return fetch(`http://localhost:8088/userLikes/${like.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}