import { Outlet, Route, Routes } from "react-router-dom"
//import { AllPosts } from "../components/posts/AllPosts"
import { useEffect, useState } from "react"
//import { NavBar } from "../components/nav/NavBar"




export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localLearningUser = localStorage.getItem("tastebud_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
  }, [])


  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* <NavBar /> */}
            <Outlet />
          </>
        }
      >
        {/* <Route index element={<AllPosts />} />
        <Route path="post">
          <Route index element={<AllPosts />} />
        </Route> */}
      </Route>
    </Routes>
  )

}