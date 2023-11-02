import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../../services/userService"
import registerImg from "../../images/gpicnic.webp"


export const Register = (props) => {
    const [user, setUser] = useState({
      email: "",
      name: ""
    })
    let navigate = useNavigate()
  
    const registerNewUser = () => {
        const newUser = {
          ...user,
        }
    
        createUser(newUser).then((createdUser) => {
          if (createdUser.hasOwnProperty("id")) {
            localStorage.setItem(
              "tastebud_user",
              JSON.stringify({
                id: createdUser.id,
                staff: createdUser.isStaff,
              })
            )
    
            navigate("/")
          }
        })
      }
    
      const handleRegister = (e) => {
        e.preventDefault()
        getUserByEmail(user.email).then((response) => {
          if (response.length > 0) {
            // Duplicate email. No good.
            window.alert("Account with that email address already exists")
          } else {
            // Good email, create user.
            registerNewUser()
          }
        })
      }
    
      const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
      }
    
//style={{ backgroundImage: `url(${registerImg})` }}


      return (
        <div className="reg-bg min-h-screen bg-cover pt-8" >
        <main className="auth-container bg-orange-200">
          <form className="auth-form" onSubmit={handleRegister}>
            <h1 className="header">Learning Moments</h1>
            <h2>Please Register</h2>
            <fieldset className="auth-fieldset">
              <div>
                <input
                  onChange={updateUser}
                  type="text"
                  id="fullName"
                  className="auth-form-input"
                  placeholder="Enter your name"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset className="auth-fieldset">
              <div>
                <input
                  onChange={updateUser}
                  type="email"
                  id="email"
                  className="auth-form-input"
                  placeholder="Email address"
                  required
                />
              </div>
            </fieldset>
            <fieldset className="auth-fieldset border px-1 rounded bg-gray-100">
              <div>
                <button type="submit">Register</button>
              </div>
            </fieldset>
          </form>
        </main>
        </div>
      )
    }