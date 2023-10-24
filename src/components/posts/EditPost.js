import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getPostById } from "../../services/getAllPosts"


export const EditPost = () => {
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
        })
    }, [postId])

    const handleSave = (event) => {
        event.preventDefault()

        if (post.title === "" || post.body === "" || post.cuisineId === undefined || post.ingredients === "" || post.description === "") {
            window.alert('Please fill out all fields')
        } else {
            editPost(post).then(() => {
                navigate('/editpost')
            })
        }
    }

    const handleInputChange = (event) => {
        const stateCopy = { ...post }
        if (event.target.name === "cuisineId") {
            stateCopy[event.target.name] = parseInt(event.target.value)
        } else {
            stateCopy[event.target.name] = event.target.value
        }
        setPost(stateCopy)
    }

    const currentCuisine = () => {
        return post.cuisineId
    }

    return (
        <form>
            <h2>Edit Post</h2>
            <div>
                <h3>Title: </h3>
                <input
                    className="title-input"
                    required
                    value={post.title ? post.title : ""}
                    name="title"
                    size="50"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <h3>Body: </h3>
                <input
                    className="body-input"
                    required
                    value={post.body ? post.body : ""}
                    name="body"
                    size="50"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <h3>Ingredients: </h3>
                <input
                    className="ingredients-input"
                    required
                    value={post.ingredients ? post.ingredients : ""}
                    name="ingredients"
                    size="50"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <h3>Description: </h3>
                <input
                    className="description-input"
                    required
                    value={post.description ? post.description : ""}
                    name="description"
                    size="50"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button className="savechagnes-btn" onClick={() => { navigate('/myposts') }}>Save Changes</button>
                <input
                    className="editpost-save"
                    onClick={handleSave}
                />
            </div>

        </form>
    )

}