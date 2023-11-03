import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getPostById } from "../../services/getAllPosts"
// import bg from "../../images/gpicnic.webp"
import "../posts/Post.css"


export const EditPost = ({ setChosenCuisine, allCuisines }) => {
    const [post, setPost] = useState([])
    const [title, setTitle] = useState("")
    const [cuisine, setCuisine] = useState({})
    const [body, setBody] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [description, setDescription] = useState("")

    const postId = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (title)
            setTitle(title)
    }, [title])

    useEffect(() => {
        if (body)
            setBody(body)
    }, [body])

    useEffect(() => {
        if (cuisine)
            setCuisine(cuisine)
    }, [cuisine])

    useEffect(() => {
        if (ingredients)
            setIngredients(ingredients)
    }, [ingredients])

    useEffect(() => {
        if (description)
            setDescription(description)
    }, [description])

    useEffect(() => {
        getPostById(postId.postId).then((data) => {
            const postObj = data[0]
            setPost(postObj)
            setTitle(postObj.title)
            setCuisine(postObj.cuisine)
            setBody(postObj.body)
            setIngredients(postObj.ingredients)
            setDescription(postObj.description)
        })
    }, [postId])

    const handleSave = (event) => {
        event.preventDefault()

        if (post?.title === "" || post?.body === "" || post?.cuisineId === undefined || post?.ingredients === "" || post?.description === "") {
            window.alert('Please fill out all fields')
        } else {
            editPost(post).then(() => {
                navigate('/myprofile')
            })
        }
    }

    const handleInputChange = (event) => {
        setPost((prevState) => {
            const updatedPost = { ...prevState }
            if (event.target.name === 'cuisineId') {
                updatedPost[event.target.name] = parseInt(event.target.value)
            } else {
                updatedPost[event.target.name] = event.target.value
            }
            return updatedPost
        })
    }
    //style={{ backgroundImage: `url(${bg})` }}
    return (
        <div className="min-h-screen px-10" >
            <h2 className="head text-center">Edit Post</h2>
            <div className="border rounded-md flex justify-center bg-orange-200 ">
                <form>
                    {/* <div className="alltopics-dropdown w-32  bg-gray-100">
                        <select
                            name="cuisines"
                            id="cuisines"
                            className="dropdown"
                            onChange={(event) => {
                                if (event.target.value === "0") {
                                    setChosenCuisine(null)
                                } else {
                                    const foundCuisine = allCuisines.find((cuisine) => cuisine.id === parseInt(event.target.value))
                                    setChosenCuisine(foundCuisine)
                                }
                            }}>
                            <option className="select-cuisines border w-40" value="0">All Cuisines</option>

                            {allCuisines.map((cuisine) => {
                                return (<option value={cuisine.id} key={cuisine.id}>{cuisine.type}</option>)
                            })}
                        </select>
                    </div> */}
                    <div>
                        <h3 className="mt-3">Title: </h3>
                        <input
                            className="title-input mb-3 border rounded"
                            required
                            value={post.title ? post.title : ""}
                            name="title"
                            style={{ width: '400px', height: '70px' }}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h3 className="">Body: </h3>
                        <input
                            className="body-input mb-3 border rounded"
                            required
                            value={post.body ? post.body : ""}
                            name="body"
                            style={{ width: '700px', height: '100px' }}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h3>Ingredients: </h3>
                        <input
                            className="ingredients-input mb-3 border rounded"
                            required
                            value={post.ingredients ? post.ingredients : ""}
                            name="ingredients"
                            style={{ width: '700px', height: '100px' }}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h3>Description: </h3>
                        <input
                            className="description-input mb-3 border rounded"
                            required
                            value={post.description ? post.description : ""}
                            name="description"
                            style={{ width: '700px', height: '100px' }}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="savechanges-btn rounded px-1 py-1 mb-5 hover:bg-orange-700" onClick={handleSave}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}