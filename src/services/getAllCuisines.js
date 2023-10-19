export const getAllCuisines = () => {
    return fetch('http://localhost:8088/cuisines').then(
        (res) => res.json()
    )
}