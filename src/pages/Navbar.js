import { Link } from "react-router-dom";
import { useUser } from '../helpers/UserProvider';

function Navbar() {
  const { getUser, signOutUser } = useUser();
  console.log(getUser);
  const onChangeHandler = () => {
    localStorage.removeItem("token");
    signOutUser();
  }

  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Apple Music</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
        <ul className="form-inline my-2 my-lg-0">
          <li className="nav-item nav-item-list dropdown">
            <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
              User
            </div>
            <div className="dropdown-menu">
              {!getUser && <>
                <Link className="dropdown-item" to="/login">Login</Link>
                <Link className="dropdown-item" to="/register">Register</Link>
              </>}
              {getUser && <>
                <Link className="dropdown-item" to="/" onClick={onChangeHandler}>Logout</Link>
              </>}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </>)
}
export default Navbar;