export const getUserLikes = () => {
    return fetch("http://localhost:8088/posts?_expand=userLikesId").then(
        (res) => res.json()
    )
}

export const getUserLikesByPostId = (postId) => {
    return fetch(`http://localhost:8088/userLikes?postId=${postId}`).then(
        (res) => res.json()
    )
}

export const saveUserPostLike = (post) => {
    const userPostLike = {
        userId: parseInt(localStorage.getItem("learning_user").slice(6, 7)),
        postId: post.id
    }
    return fetch("http://localhost:8088/userPostLikes", {
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