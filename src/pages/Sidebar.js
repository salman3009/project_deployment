import { Link } from "react-router-dom";

function Sidebar() {
    return (<>
        <ul class="list-group">
            <Link to="/"><li class="list-group-item">Home</li></Link>
            <Link to="/library"><li class="list-group-item">Library</li></Link>
        </ul>
    </>)
}
export default Sidebar;