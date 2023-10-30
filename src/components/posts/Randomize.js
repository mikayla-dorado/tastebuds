// import { useState } from "react"
// import { Post } from "./Post"
// import { Link } from "react-router-dom"


// export const Randomize = ({recipes, post}) => {
// const [randomRecipe, setRandomRecipe] = useState(null)

// const handleRandomize = () => {
//     const randomIndex = Math.floor(Math.random() * recipes.length)
//     setRandomRecipe(recipes[randomIndex])
// }


// return (
//     <div>
//         <button onClick={handleRandomize}>Random Recipe Generator</button>
//         {randomRecipe && (
//             <div>
//                 <div className="individual-post w-auto bg-orange-200">
//             <div className="allposts-title underline">
//                 <Link to={`/post/${post.id}`} >{post?.title} </Link>
//             </div>
//             <div className="post-cuisine ">
//                 {post?.cuisine?.type}
//             </div>
//             <div className="post-description border-double w-60">
//                 {post?.description}
//             </div>
//         </div>
//                 </div>
//         )}
//     </div>
// )
// }