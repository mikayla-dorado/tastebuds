import { useState } from "react"
import { Link } from "react-router-dom"
import "../../styles.css"


export const Randomize = ({ posts, onRandomize }) => {
    const [randomPost, setRandomPost] = useState(null)


    const getRandomPost = () => {
        if (posts.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * posts.length);
        return posts[randomIndex];
    }

    const handleRandomize = () => {
        const randomPost = getRandomPost()
        setRandomPost(randomPost)
        onRandomize(randomPost)
    }

    return (
        <div>
            <button onClick={handleRandomize}
                className=" random-btn font-bold py-2 px-4 rounded focus:outline-none hover:bg-orange-700">Random Recipe Generator</button>
            {randomPost && (
                <div>
                    <div className="individual-post w-auto bg-orange-200">
                        <div className="allposts-title underline">
                            <Link to={`/post/${randomPost.id}`}>{randomPost?.title}</Link>
                        </div>
                        <div className="post-cuisine">{randomPost?.cuisine?.type}</div>
                        <div className="post-description border-double w-60">
                            {randomPost?.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
