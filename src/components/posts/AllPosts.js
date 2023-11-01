import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../../services/getAllPosts"
import { getAllCuisines } from "../../services/getAllCuisines"
import { Post } from "./Post"
import { FilterBar } from "./FilterBar"
import picnic from "../../images/picnic2.webp"
import graypicnic from "../../images/graypicnic.webp"
import { Randomize } from "./Randomize"
import { useTheme } from "../../components/ThemeContext"


export const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [chosenCuisine, setChosenCuisine] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [allCuisines, setAllCuisines] = useState([])
    const [randomPost, setRandomPost] = useState(null)
    //const [theme, setTheme] = useState(null)
    //const [backgroundImage, setBackgroundImage] = useState(picnic)

    const { theme, toggleTheme, backgroundImage } = useTheme()


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

    // useEffect(() => {
    //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //         setTheme('dark')
    //     } else {
    //         setTheme('light')
    //     }
    // }, [])

    // useEffect(() => {
    //     if (theme === 'dark') {
    //         document.documentElement.classList.add('dark')
    //     } else {
    //         document.documentElement.classList.remove('dark')
    //     }
    // }, [theme])

    // useEffect(() => {
    //     if (theme === 'dark') {
    //         setBackgroundImage(graypicnic);
    //     } else {
    //         setBackgroundImage(picnic);
    //     }
    // }, [theme]);


    // const handleThemeSwitch = () => {
    //     setTheme(theme === 'dark' ? 'light' : 'dark')
    // }

    const handleRandomize = (randomPost) => {
        setRandomPost(randomPost)
    }


    return (
        <div className={`bg-img bg-cover min-h-screen ${theme}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="">
                <button className="bg-green-200 p-4 rounded 3-xl" onClick={toggleTheme}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
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
        </div>
    )
}
