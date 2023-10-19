export const getAllPosts = () => {
    return fetch('http://localhost:8088/posts?_expand=cuisine&_userLikesId&_user').then(
        (res) => res.json()
    )
}