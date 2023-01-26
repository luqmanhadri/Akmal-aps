import Cookies from 'js-cookie';
// import { useNavigate } from "react-router-dom";

const VerifyToken = ({ navigate, Component }) => {

    // let navigate = useNavigate()
    const token = Cookies.get('access_token');
    let datatoken

    if (token && typeof token !== 'undefined') {
        datatoken = JSON.parse(token);
        // use datatoken here
    }
    return (props) => {
        if (!datatoken
            //  || !isValid(datatoken)
             ) {
            // return <Redirect to='/login' />;
            navigate("/login")
        }
        return <Component {...props} />;
    }
}

export default VerifyToken