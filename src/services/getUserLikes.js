export const getUserLikes = (userId) => {
    return fetch(`http://localhost:8088/userLikes/?userId=${userId}&_expand=post&_expand=user`).then(
        (res) => res.json()
    )
}

export const getUserLikesByPostId = (postId) => {
    return fetch(`http://localhost:8088/userLikes?_expand=postId=${postId}`).then(
        (res) => res.json()
    )
}

export const saveUserPostLike = (post) => {
    console.log(post)
    const userPostLike = {
        userId: parseInt(localStorage.getItem("tastebud_user").slice(6, 7)),
        postId: post
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