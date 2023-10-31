import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../../services/getAllPosts"
import { getAllCuisines } from "../../services/getAllCuisines"
import { Post } from "./Post"
import { FilterBar } from "./FilterBar"
import picnic from "../../images/picnic2.webp"
import { Randomize } from "./Randomize"


export const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [chosenCuisine, setChosenCuisine] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [allCuisines, setAllCuisines] = useState([])
    const [randomPost, setRandomPost] = useState(null)


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

    const handleRandomize = (randomPost) => {
        setRandomPost(randomPost)
    }



    return (
        <div className="bg-cover min-h-screen" style={{ backgroundImage: `url(${picnic})` }}>
            <FilterBar allCuisines={allCuisines} setChosenCuisine={setChosenCuisine} setSearchTerm={setSearchTerm} />
            {randomPost ? (
                <Post post={randomPost} key={randomPost.id} />
            ) : (
                <>
                    <div className="random">
                        <Randomize posts={filteredPosts} onRandomize={handleRandomize} />
                    </div>
                    <div className="posts-container" >
                        <div className="">
                            {filteredPosts.map((postObj) => {
                                return (
                                    <Post post={postObj} key={postObj.id} />
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}