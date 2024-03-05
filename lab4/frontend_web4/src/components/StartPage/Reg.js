import {useDispatch, useSelector} from "react-redux";
import sendRequest, {preparations} from "../../actions/sendRequest";
import setData from "../../actions/callbacks/setData";
import setState from "../../actions/callbacks/setState";
import wantReg from "../../actions/callbacks/wantReg";
import Header from "../Header/Header";
import setUserInfo from "../../actions/callbacks/setUserInfo";
import {Button} from "react-toolbox/lib/button";
import {validation} from "../../actions/validators/loginValidator";
import NavBar from "../NavBar/NavBar";



function Reg() {
    const dispatch = useDispatch();
    const X = useSelector(state => state.X);
    const Y = useSelector(state => state.Y);
    const R = useSelector(state => state.R);
    const data = useSelector(state => state.data)
    const userInfo = useSelector(state => state.userInfo);
    const message = useSelector(state => state.state);

    function register() {
        if (validation(userInfo.login, "login_reg_error", userInfo.password, "password_reg_error")) {
            let data = new FormData();
            data.set("login", userInfo.login);
            data.set("password", userInfo.password);
            sendRequest("/registration", data).then(response => {
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
                    dispatch(wantReg(false));
                } else {
                    document.getElementById("password_reg_error").innerHTML = "Login already in use";
                    return response.text().then(text => dispatch(setState(text)))
                }
            }).catch(err => console.log(err));
        }
    }

    return (
        <div id="div-auth">
            <Header/>
            <fieldset id="login-fieldset">
                <legend><b>REGISTRATION</b></legend>
                <form id="login-form">
                    <table id="login-table">
                        <tr><label htmlFor="login">Login<br/></label></tr>
                        <tr><input id="login" className="auth_input" onChange={(val) => {
                            dispatch(setUserInfo(val.target.value, userInfo.password))
                        }}/></tr>
                        <tr id="login_reg_error" className="login_error"/>
                        <tr><label htmlFor="password">Password<br/></label></tr>
                        <tr><input id="password" className="auth_input" type="password" onChange={(val) => {
                            dispatch(setUserInfo(userInfo.login, val.target.value))
                        }}/></tr>
                        <tr id="password_reg_error" className="login_error"/>
                        <tr><Button label="Register" className="auth_button" onClick={register}/></tr>
                        <tr><Button label="Go to sign in" className="change_button" onClick={() => dispatch(wantReg(false))}/></tr>
                    </table>
                </form>
            </fieldset>
        </div>
    );
}


export default Reg;