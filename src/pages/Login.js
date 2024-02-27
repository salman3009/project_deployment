import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../helpers/UserProvider';

function Login() {

    const [getData, setData] = useState({
        email: '',
        password: '',
        appType: 'music'
    })

    const { signInUser } = useUser();


    const [getError, setError] = useState("");

    const navigate = useNavigate();


    const onChangeHandler = (event) => {
        setData({ ...getData, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setError('');
        axios.post("https://academics.newtonschool.co/api/v1/user/login", getData).then((response) => {
            console.log(response.data);
            debugger;
            localStorage.setItem("token", response.data.token);
            signInUser({ status: response.data.status, token: response.data.token, name: response.data.data.name, email: response.data.data.email })
            navigate('/');
        }).catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("unknow error please try after sometime");
            }
        })
    }

    return (<>
        <div className="row">
            <div className="col-4">

            </div>
            <div className="col-4">
                {getError && <div class="alert alert-danger" role="alert">
                    {getError}
                </div>}
                <form onSubmit={onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="emailAddress">Email address</label>
                        <input type="email" name="email" value={getData.email} onChange={onChangeHandler} className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={getData.password} onChange={onChangeHandler} className="form-control" id="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="appType">App Type</label>
                        <select name="appType" onChange={onChangeHandler} className="form-control" id="appType">
                            <option value="music">music</option>
                            <option value="album">album</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
            <div className="col-4">

            </div>
        </div>
    </>)
}
export default Login;