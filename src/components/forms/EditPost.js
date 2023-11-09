import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getPostById } from "../../services/getAllPosts"
// import bg from "../../images/gpicnic.webp"
import "../posts/Post.css"
import { getAllCuisines } from "../../services/getAllCuisines"


export const EditPost = () => {
    const [post, setPost] = useState([])
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [description, setDescription] = useState("")
    const [selectedCuisineId, setSelectedCuisineId] = useState('')
    const [cuisines, setCuisines] = useState([])


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
        if (selectedCuisineId)
            setSelectedCuisineId(selectedCuisineId)
    }, [selectedCuisineId])


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
            setSelectedCuisineId(postObj.cuisine?.id || '')
            setBody(postObj.body)
            setIngredients(postObj.ingredients)
            setDescription(postObj.description)
        })
    }, [postId])

    useEffect(() => {
        getAllCuisines().then((cuisinesArray) => {
            setCuisines(cuisinesArray)
        })
    }, [])


    const handleSave = (event) => {
        event.preventDefault()

        const updatedPost = {
            ...post,
            title,
            body,
            cuisineId: parseInt(selectedCuisineId),
            ingredients,
            description,
        };

        if (
            updatedPost.title === "" ||
            updatedPost.body === "" ||
            updatedPost.cuisineId === undefined ||
            updatedPost.ingredients === "" ||
            updatedPost.description === ""
        ) {
            window.alert('Please fill out all fields');
        } else {
            editPost(updatedPost).then(() => {
                navigate('/myprofile');
            });
        }
    }

    const handleInputChange = (event) => {
        setSelectedCuisineId(event.target.value)
    }

    //style={{ backgroundImage: `url(${bg})` }}
    return (
        <div className="min-h-screen px-10" >
            <h2 className="head text-center">Edit Post</h2>
            <div className="border rounded-md flex justify-center bg-orange-200 ">
                <form>
                    <div>
                        <select
                            name="cuisines"
                            id="cuisines"
                            onChange={handleInputChange}
                            value={selectedCuisineId}
                            className="drop border rounded mt-5 ml-9">
                            <option className="border ">Select Cuisine</option>

                            {cuisines.map((cuisine) => {
                                return (<option value={cuisine.id} key={cuisine.id}>{cuisine.type}</option>)
                            })}
                        </select>
                    </div>

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