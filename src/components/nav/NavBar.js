import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()

return (
    <ul className="navbar bg-green-500">
        <li className="navbar-item underline">
            <Link to="/">Home</Link>
        </li>
        <li className="navbar-item underline">
            <Link to="/myprofile">Profile</Link>
        </li>
        <li className="navbar-item underline">
            <Link to="/favorites">Favorites</Link>
        </li>
            {localStorage.getItem("tastebud_user") ? (
                <li>
                    <Link
                        to=""
                        onClick={() => {
                            localStorage.removeItem("tastebud_user")
                            navigate("/login", { replace: true })
                        }}
                    className="underline">
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
    </ul>
)
}