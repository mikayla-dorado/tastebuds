import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../../services/getAllPosts"
import { getAllCuisines } from "../../services/getAllCuisines"
import { Post } from "./Post"
import { FilterBar } from "./FilterBar"


export const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [chosenCuisine, setChosenCuisine] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [allCuisines, setAllCuisines] = useState([])


    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setPosts(postsArray)
        })
    }, [])


    useEffect(() => {
        getAllCuisines().then((cuisinesArray) => {
            setAllCuisines(cuisinesArray)
        })
    }, [])


    useEffect(() => {
        const foundPosts = posts.filter(
            post => post.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
        setFilteredPosts(foundPosts)
    }, [searchTerm, posts])


    useEffect(() => {
        if (chosenCuisine) {
            const cuisinePosts = posts.filter((post) => post.cuisineId === chosenCuisine.id)
            setFilteredPosts(cuisinePosts)
        } else {
            setFilteredPosts(posts)
        }
    }, [chosenCuisine, posts])


    return (
        <div>
            <div>
                <FilterBar allCuisines={allCuisines} setChosenCuisine={setChosenCuisine} setSearchTerm={setSearchTerm} />
            </div>
            <div className="posts-container bg-gray-200">
                <div className="">
                    {filteredPosts.map((postObj) => {
                        return (
                            <Post post={postObj} key={postObj.id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )

}