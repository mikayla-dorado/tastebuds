import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"
import picnic2 from "../../images/picnic2.webp"
import { createContext, useContext } from "react"
import "../../styles.css"

const dataContext = createContext()


export const Login = () => {
  const [email, set] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "tastebud_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }


 //style={{ backgroundImage: `url(${picnic2})` }}
  return (
    <dataContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div className="min-h-screen bg-cover pt-8 " >
        <main className="auth-container bg-orange-200">
          <section>
            <form className="auth-form" onSubmit={handleLogin}>
              <h1 className="header">TasteBuds</h1>
              <h2>Please sign in</h2>
              <fieldset className="auth-fieldset">
                <div>
                  <input
                    type="email"
                    value={email}
                    className="auth-form-input"
                    onChange={(evt) => set(evt.target.value)}
                    placeholder="Email address"
                    required
                    autoFocus
                  />
                </div>
              </fieldset>
              <fieldset className="auth-fieldset">
                <div >
                  <button className="signin-btn bg-gray-100 rounded hover:bg-orange-700" type="submit">Sign in</button>
                </div>
              </fieldset>
            </form>
          </section>
          <section className="register-link underline">
            <Link to="/register">Not a member yet?</Link>
          </section>
          
        </main>
      </div>
    </dataContext.Provider>
  )
}
export function useData() {
  return useContext(dataContext)
}




