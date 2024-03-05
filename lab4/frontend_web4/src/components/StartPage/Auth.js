import {useDispatch, useSelector} from "react-redux";
import sendRequest, {preparations} from "../../actions/sendRequest";
import setData from "../../actions/callbacks/setData";
import setState from "../../actions/callbacks/setState";
import logIn from "../../actions/callbacks/logIn";
import {Button} from "react-toolbox/lib/button";
import wantReg from "../../actions/callbacks/wantReg";
import setUserInfo from "../../actions/callbacks/setUserInfo";
import Header from "../Header/Header";
import '../../styles/start_page.css';
import {validation} from "../../actions/validators/loginValidator";
import Navbar from "../NavBar/NavBar";


function Auth() {
    const dispatch = useDispatch();
    const X = useSelector(state => state.X);
    const Y = useSelector(state => state.Y);
    const R = useSelector(state => state.R);
    const data = useSelector(state => state.data);
    const userInfo = useSelector(state => state.userInfo);
    const message = useSelector(state => state.state)

    function signIn() {
        console.log(userInfo.login);
        console.log(userInfo.password);

        if (validation(userInfo.login, "login_error", userInfo.password, "password_error")) {
            let data = new FormData();
            data.set("login", userInfo.login);
            data.set("password", userInfo.password);
            sendRequest("/login", data).then(response => {
                if (response.ok) {
                    preparations(data).then(response => {
                        if (response.ok) {
                            return response.json().then(taken => {
                                dispatch(setData(taken));
                            });
                        } else {
                            return response.text().then(text => dispatch(setState(text)));
                        }
                    });
                    dispatch(setState());
                    dispatch(logIn());
                } else {
                    document.getElementById("password_error").innerHTML = "Wrong password or username"
                    return response.text().then(text => dispatch(setState(text)))
                }
            }).catch(err => console.log(err));
        }
    }

    return (
        <div id="div-auth">
            <Header/>
            <fieldset id="login-fieldset">
                <legend><b>SING IN</b></legend>
                <form id="login-form">
                    <table id="login-table">
                        <tr><label htmlFor="login">Login<br/></label></tr>
                        <tr><input id="login" className="auth_input" onChange={(val) => {
                            dispatch(setUserInfo(val.target.value, userInfo.password))
                        }}/></tr>
                        <tr id="login_error" className="login_error"/>
                        <tr><label htmlFor="password">Password<br/></label></tr>
                        <tr><input id="password" className="auth_input" type="password" onChange={(val) => {
                            dispatch(setUserInfo(userInfo.login, val.target.value))
                        }}/></tr>
                        <tr id="password_error" className="login_error"/>
                        <tr><Button label="Sign In" className="auth_button" onClick={signIn}/></tr>
                        <tr><Button label="Go to registration" className="change_button"  onClick={() => dispatch(wantReg(true))}/></tr>
                    </table>
                </form>
            </fieldset>
        </div>
    );
}


export default Auth;