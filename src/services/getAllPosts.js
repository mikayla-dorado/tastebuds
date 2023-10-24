export const getAllPosts = () => {
    return fetch('http://localhost:8088/posts?_expand=cuisine&_userLikesId&_user').then(
        (res) => res.json()
    )
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts?id=${id}&_expand=cuisine&_expand=user`).then(
        (res) => res.json()
    )
}

export const getPostByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=user&_expand=cuisine`).then(
        (res) => res.json()
    )
}

export const createNewPost = (post) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    })
}

export const deletePost = (post) => {
    return fetch("http://localhost:8088/posts", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    })
}

export const editPost = (post) => {
    return fetch("http://localhost:8088/posts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    })
}