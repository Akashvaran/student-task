import { FaRegUserCircle } from "react-icons/fa";
import './Todo.css'
import { Link } from "react-router-dom";

export const Todo = () => {
    return (
        <>
            <div className="navicate-container">
                <div className="main-container">
                    <div className="user-icon">
                        <FaRegUserCircle size={100} />
                    </div>
                    <div className="auth-buttons">
                        <Link to={'/signup'} className="auth-button">Sign up</Link>
                        <Link to={'/signin'} className="auth-button">Sign in</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
