import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCuisines } from "../../services/getAllCuisines"
import { createNewPost } from "../../services/getAllPosts"


export const NewPost = ({ currentUser }) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [imageURL, setimageURL] = useState("")
    const [cuisines, setCuisines] = useState([])
    const [selectedCuisineId, setSelectedCuisineId] = useState({})

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
        if (description)
            setDescription(description)
    }, [description])

    useEffect(() => {
        if (imageURL)
        setimageURL(imageURL)
    },[imageURL])

    useEffect(() => {
        getAllCuisines().then((cuisinesArray) => {
            setCuisines(cuisinesArray)
        })
    }, [])

    const handleSave = async (event) => {
        event.preventDefault()
        console.log("clicked")

        const newPost = await createNewPost({
            title: title,
            body: body,
            description: description,
            imageURL: imageURL,
            cuisineId: selectedCuisineId,
            userId: currentUser.id
        })
        navigate('/myprofile')
    }

    return (
        <div>
            <header className="text-center">Create a New Post</header>

            <form onSubmit={handleSave}>
                
                <select
                    name="cuisines"
                    id="cuisines"
                    onChange={(e) => setSelectedCuisineId(e.target.value)}
                    value={selectedCuisineId}
                >
                    <option>Select Cuisine</option>

                    {cuisines.map((cuisine) => {
                        return (<option value={cuisine.id} key={cuisine.id}>{cuisine.type}</option>)
                    })}
                </select>
                <div>
                    <h2>Title: </h2>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <h2>Description: </h2>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <h2>Ingredients: </h2>
                    <input
                        type="text"
                        id="ingredients"
                        name="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <h2>Body: </h2>
                    <input
                        type="text"
                        id="body"
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <h2>Image: </h2>
                    <input
                        type="text"
                        id="imageURL"
                        name="imageURL"
                        value={imageURL}
                        onChange={(e) => setimageURL(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="save" onClick={handleSave} className="border border bg-gray-100">
                        Post Recipe
                    </button>
                </div>
            </form>
        </div>

    )
}