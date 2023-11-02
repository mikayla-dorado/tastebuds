import { Outlet, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/nav/NavBar"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/posts/NewPost"
import { MyProfile } from "../components/posts/MyProfile"
import { EditPost } from "../components/forms/EditPost"
import { Favorites } from "../components/posts/Favorites"
import "../styles.css"



export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})


  useEffect(() => {
    const localLearningUser = localStorage.getItem("tastebud_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
  }, [])


  const DarkModeFunction = () => {
    var element = document.body;
    element.classList.toggle("darkMode");
  }


  return (
    <>

      <Routes>
        <Route
          path="/"
          element={

            <>
              <NavBar />
              <button onClick={DarkModeFunction} className="toggle-btn rounded my-1.5 text-xl px-3 flex justify-between w-20"><i class="fa-regular fa-sun"></i><i class="fa-solid fa-moon"></i></button>
              <Outlet />
            </>

          }
        >
          <Route index element={<AllPosts />} />
          <Route path="post">
            <Route index element={<AllPosts />} />
            <Route path=":postId" element={<PostDetails currentUser={currentUser} />} />
          </Route>
          <Route path="newpost" element={<NewPost currentUser={currentUser} />} />
          <Route path="myprofile" element={<MyProfile currentUser={currentUser} />} />
          <Route path="favorites" element={<Favorites currentUser={currentUser} />} />
          <Route path="editpost">
            <Route path=":postId" element={<EditPost currentUser={currentUser} />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}