export const getUserLikes = () => {
    return fetch("http://localhost:8088/posts?_expand=userLikesId").then(
        (res) => res.json()
    )
}