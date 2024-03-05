import React, {useEffect, useState} from "react";
import "../../styles/main_page.css"
import "../../styles/main_page_mobile.css"
import {Button} from "react-toolbox/lib/button";
import Input from 'react-toolbox/lib/input';
import {useDispatch, useSelector} from "react-redux";
import setX from "../../actions/callbacks/setX";
import setY from "../../actions/callbacks/setY";
import setR from "../../actions/callbacks/setR";
import logOut from "../../actions/callbacks/logOut";
import clearData from "../../actions/callbacks/clearData";
import sendRequest from "../../actions/sendRequest";
import addData from "../../actions/callbacks/addData";
import setState from "../../actions/callbacks/setState";
import {validation, validationMobile} from "../../actions/validators/formValidator";
import deleteData from "../../actions/callbacks/deleteData";
import Navbar from "../NavBar/NavBar";
import setUserInfo from "../../actions/callbacks/setUserInfo";
import Header from "../Header/Header";


function Main(props) {
    const dispatch = useDispatch();
    const X = useSelector(state => state.X)
    const Y = useSelector(state => state.Y)
    const R = useSelector(state => state.R)
    const data = useSelector(state => state.data)
    const userInfo = useSelector(state => state.userInfo)
    const message = useSelector(state => state.state)

    let windowWidth = props.windowWidth;
    let windowHeight = props.windowHeight;
    console.log(windowWidth);
    console.log(windowHeight);

    const onChange = (event) => {
        console.log(event.target.value)
        const value = event.target.value;
        setX(value);
    };

    if(R==null) dispatch(setR(1));
    let R30 = R*30;
    let circleX_1 = 150 - R30
    let circleX_2 = 150 - R30/2
    let circleX_3 = 150 + R30/2
    let circleX_4 = 150 + R30
    let circleY_1 = 150 - R30
    let circleY_2 = 150 - R30/2
    let circleY_3 = 150 + R30/2
    let circleY_4 = 150 + R30
    let nameX_1 = 150 - R30 - 8
    let nameX_2 = 150 + R30 + 2
    let nameY_1 = 150 - R30 + 2.5
    let nameY_2 = 150 + R30 + 2.5
    let circle1 = 150 - R30
    let circle2 = 150 + R30


    let dots = data.map(function (hit) {
        let xCord = hit.X * 30 + 150
        let yCord = 150 - 30 * hit.Y
        return <circle cx={xCord}
                       cy={yCord}
                       r={2.5}
                       fill={hit.status.toString().toLowerCase() === 'true' ? "green" : "red"}/>
    });

    let results = data.map(function (hit) {
        return <tr className="tr-results">
            <th className="th-results">{hit.X}</th>
            <th className="th-results">{hit.Y}</th>
            <th className="th-results">{hit.R}</th>
            <th className="th-results">{hit.script_time}</th>
            <th className="th-results">{hit.date.substring(0, 19)}</th>
            <th className={hit.status.toString() === 'Status' ? 'head' : hit.status.toString() === 'true' ? 'true' : 'false'}>{hit.status}</th>
        </tr>;
    });

    if(windowWidth < 880){
        return (
                <div>
                    <Header/>
                    <table id="table-up-mobile">
                        <tr id="tr-data">
                            <td id="td-data-mobile" colSpan="2">
                                <fieldset id="fieldset-data">
                                    <form id="form-data">
                                        <table id="table-data-mobile">
                                            <tr>
                                                <td colSpan="3" className="th-name-value">X value:</td>
                                            </tr>
                                            <select id="x_values-mobile" onChange={(event) => {
                                                dispatch(setX(event.target.value));
                                            }}>
                                                <option value="choose">Choose -----></option>
                                                <option value="-4">-4</option>
                                                <option value="-3">-3</option>
                                                <option value="-2">-2</option>
                                                <option value="-1">-1</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                            <tr>
                                                <td colSpan="3" id="x_error"></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="th-name-value">Y value (-3, 5):</td>
                                            </tr>
                                            <tr>
                                                <div id="beauty">
                                                    <Input id="Y-mobile" type="number" value={Y}
                                                           onChange={(val) => {
                                                               dispatch(setY(val));
                                                           }}/>
                                                </div>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" id="y_error"></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="th-name-value">R value:</td>
                                            </tr>
                                            <select id="r_values-mobile" onChange={(event) => {
                                                dispatch(setR(event.target.value));
                                            }}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                            <tr>
                                                <Button id="send_button-mobile" label="Check" onClick={() => {
                                                    if (validationMobile(Y)) {
                                                        let data = new FormData();
                                                        data.set("X", X);
                                                        data.set("Y", Y);
                                                        data.set("R", R);
                                                        data.set("login", localStorage.getItem("user"));
                                                        data.set("password", localStorage.getItem("password"));
                                                        sendRequest("/shots/add", data, dispatch).then(response => {
                                                            if (response.ok) {
                                                                return response.json().then(hit => {
                                                                    dispatch(addData(hit[0]));
                                                                    dispatch(setState())
                                                                });
                                                            } else {
                                                                return response.text().then(text => dispatch(setState(text)));
                                                            }
                                                        }).catch(err => console.log(err));
                                                    }
                                                }}/>
                                            </tr>
                                        </table>
                                    </form>
                                </fieldset>
                            </td>
                        </tr>
                        <tr id="tr-svg">
                            <td id="td-svg-mobile" colSpan="2">
                                <div id="div-svg">
                                    <fieldset id="fieldset-svg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" onClick={(e) => {
                                            e.preventDefault();
                                            const coordinateX = e.nativeEvent.offsetX;
                                            const coordinateY = e.nativeEvent.offsetY;
                                            const x = ((coordinateX - 150) / 30);
                                            const y = (((-1) * (coordinateY - 150)) / 30);
                                            let data = new FormData();
                                            data.set("X", x.toFixed(2).toString());
                                            data.set("Y", y.toFixed(2).toString());
                                            data.set("R", R);
                                            data.set("login", localStorage.getItem("user"));
                                            data.set("password", localStorage.getItem("password"));
                                            sendRequest("/shots/add", data, dispatch).then(response => {
                                                if (response.ok) {
                                                    return response.json().then(hit => {
                                                        dispatch(addData(hit[0]));
                                                        dispatch(setState())
                                                    });
                                                } else {
                                                    return response.text().then(text => dispatch(setState(text)));
                                                }
                                            }).catch(err => console.log(err));

                                        }}>
                                            <line x1="0" x2="300" y1="150" y2="150" stroke="#2E2F45"/>
                                            <line x1="150" x2="150" y1="0" y2="300" stroke="#2E2F45"/>

                                            <polygon points="150,0 145,15 155,15" stroke="#2E2F45"/>
                                            <polygon points="300,150 285,145 285,155" stroke="#2E2F45"/>

                                            <circle id="circleX_1" cx={`${circleX_1}`} cy="150" r="3" fill="#2E2F45"/>
                                            <circle id="circleX_2" cx={`${circleX_2}`} cy="150" r="3" fill="#2E2F45"/>
                                            <circle id="circleCenter" cx="150" cy="150" r="3" fill="#2E2F45"/>
                                            <circle id="circleX_3" cx={`${circleX_3}`} cy="150" r="3" fill="#2E2F45"/>
                                            <circle id="circleX_4" cx={`${circleX_4}`} cy="150" r="3" fill="#2E2F45"/>

                                            <circle id="circleY_1" cx="150" cy={`${circleY_1}`} r="3" fill="#2E2F45"/>
                                            <circle id="circleY_2" cx="150" cy={`${circleY_2}`} r="3" fill="#2E2F45"/>
                                            <circle id="circleY_3" cx="150" cy={`${circleY_3}`} r="3" fill="#2E2F45"/>
                                            <circle id="circleY_4" cx="150" cy={`${circleY_4}`} r="3" fill="#2E2F45"/>

                                            <polygon id="triangle" stroke="black" fill="transparent" fill-opacity="0.3"
                                                     points={`${150 - R30},150 150,${150 + R30 / 2} 150,150`}/>

                                            <polygon id="rectangle" stroke="black" fill="transparent" fill-opacity="0.3"
                                                     points={`150,150 150,${150 + R30} ${150 + R30},${150 + R30} ${150 + R30},150`}/>

                                            <path id="circle"
                                                  d={`M150,${circle1} A${R30},${R30} 90 0,1 ${circle2},150 L 150,150 Z`}
                                                  stroke="black" fill="transparent" fill-opacity="0.3"/>

                                            <text x="285" y="135">X</text>
                                            <text x="160" y="15">Y</text>

                                            <text id="nameX_1" x={`${nameX_1}`} y="142" font-size="11px">-R</text>
                                            <text id="nameX_2" x={`${nameX_2}`} y="142" font-size="11px">R</text>

                                            <text id="nameY_1" x="135" y={`${nameY_1}`} font-size="11px"> R</text>
                                            <text id="nameY_2" x="132" y={`${nameY_2}`} font-size="11px">-R</text>
                                            {dots}
                                        </svg>
                                    </fieldset>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td id="td-logout-mobile" colSpan="1">
                                <Button label="Log out" id="logout-btn-mobile" onClick={() => {
                                    localStorage.removeItem("user");
                                    localStorage.removeItem("password");
                                    dispatch(setUserInfo("", ""))
                                    dispatch(clearData());
                                    dispatch(logOut());
                                }}/>
                            </td>
                            <td id="td-clean-mobile" colSpan="1">
                                <Button label="Delete results" id="clean-btn-mobile" onClick={() => {
                                    let data = new FormData();
                                    data.set("login", localStorage.getItem("user"));
                                    data.set("password", localStorage.getItem("password"));
                                    sendRequest("/shots/delete", data, dispatch).then(response => {
                                        if (response.ok) {
                                            dispatch(deleteData())
                                        } else {
                                            return response.text().then(text => dispatch(setState(text)));
                                        }
                                    }).catch(err => console.log(err));
                                }}/>
                            </td>
                        </tr>
                    </table>
                    <div className="scrollit">
                        <table id="table-down">
                            {results}
                        </table>
                    </div>
                </div>)
    }else {
        return (
            <div>
                <Header/>
                <table id="table-up">
                    <tr>
                        <td id="td-data">
                            <fieldset id="fieldset-data">
                                <form id="form-data">
                                    <table id="table-data">
                                        <tr>
                                            <td colSpan="3" className="th-name-value">X value:</td>
                                        </tr>
                                        <select id="x_values" onChange={(event) => {
                                            dispatch(setX(event.target.value));
                                        }}>
                                            <option value="choose">Choose -></option>
                                            <option value="-4">-4</option>
                                            <option value="-3">-3</option>
                                            <option value="-2">-2</option>
                                            <option value="-1">-1</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <tr>
                                            <td colSpan="3" id="x_error"></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className="th-name-value">Y value (-3, 5):</td>
                                        </tr>
                                        <tr>
                                            <Input id="Y" type="number" value={Y}
                                                   onChange={(val) => {
                                                       dispatch(setY(val));
                                                   }}/>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" id="y_error"></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className="th-name-value">R value:</td>
                                        </tr>
                                        <select id="r_values" onChange={(event) => {
                                            dispatch(setR(event.target.value));
                                        }}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <tr>
                                            <Button id="send_button" label="Check" onClick={() => {
                                                if (validation(Y)) {
                                                    let data = new FormData();
                                                    data.set("X", X);
                                                    data.set("Y", Y);
                                                    data.set("R", R);
                                                    data.set("login", localStorage.getItem("user"));
                                                    data.set("password", localStorage.getItem("password"));
                                                    sendRequest("/shots/add", data, dispatch).then(response => {
                                                        if (response.ok) {
                                                            return response.json().then(hit => {
                                                                dispatch(addData(hit[0]));
                                                                dispatch(setState())
                                                            });
                                                        } else {
                                                            return response.text().then(text => dispatch(setState(text)));
                                                        }
                                                    }).catch(err => console.log(err));
                                                }
                                            }}/>
                                        </tr>
                                    </table>
                                </form>
                            </fieldset>
                        </td>
                        <td id="td-svg">
                            <div id="div-svg">
                                <fieldset id="fieldset-svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" onClick={(e) => {
                                        e.preventDefault();
                                        const coordinateX = e.nativeEvent.offsetX;
                                        const coordinateY = e.nativeEvent.offsetY;
                                        const x = ((coordinateX - 150) / 30);
                                        const y = (((-1) * (coordinateY - 150)) / 30);
                                        let data = new FormData();
                                        data.set("X", x.toFixed(2).toString());
                                        data.set("Y", y.toFixed(2).toString());
                                        data.set("R", R);
                                        data.set("login", localStorage.getItem("user"));
                                        data.set("password", localStorage.getItem("password"));
                                        sendRequest("/shots/add", data, dispatch).then(response => {
                                            if (response.ok) {
                                                return response.json().then(hit => {
                                                    dispatch(addData(hit[0]));
                                                    dispatch(setState())
                                                });
                                            } else {
                                                return response.text().then(text => dispatch(setState(text)));
                                            }
                                        }).catch(err => console.log(err));
                                    }}>
                                        <line x1="0" x2="300" y1="150" y2="150" stroke="#2E2F45"/>
                                        <line x1="150" x2="150" y1="0" y2="300" stroke="#2E2F45"/>

                                        <polygon points="150,0 145,15 155,15" stroke="#2E2F45"/>
                                        <polygon points="300,150 285,145 285,155" stroke="#2E2F45"/>

                                        <circle id="circleX_1" cx={`${circleX_1}`} cy="150" r="3" fill="#2E2F45"/>
                                        <circle id="circleX_2" cx={`${circleX_2}`} cy="150" r="3" fill="#2E2F45"/>
                                        <circle id="circleCenter" cx="150" cy="150" r="3" fill="#2E2F45"/>
                                        <circle id="circleX_3" cx={`${circleX_3}`} cy="150" r="3" fill="#2E2F45"/>
                                        <circle id="circleX_4" cx={`${circleX_4}`} cy="150" r="3" fill="#2E2F45"/>

                                        <circle id="circleY_1" cx="150" cy={`${circleY_1}`} r="3" fill="#2E2F45"/>
                                        <circle id="circleY_2" cx="150" cy={`${circleY_2}`} r="3" fill="#2E2F45"/>
                                        <circle id="circleY_3" cx="150" cy={`${circleY_3}`} r="3" fill="#2E2F45"/>
                                        <circle id="circleY_4" cx="150" cy={`${circleY_4}`} r="3" fill="#2E2F45"/>

                                        <polygon id="triangle" stroke="black" fill="transparent" fill-opacity="0.3"
                                                 points={`${150 - R30},150 150,${150 + R30 / 2} 150,150`}/>

                                        <polygon id="rectangle" stroke="black" fill="transparent" fill-opacity="0.3"
                                                 points={`150,150 150,${150 + R30} ${150 + R30},${150 + R30} ${150 + R30},150`}/>

                                        <path id="circle"
                                              d={`M150,${circle1} A${R30},${R30} 90 0,1 ${circle2},150 L 150,150 Z`}
                                              stroke="black" fill="transparent" fill-opacity="0.3"/>

                                        <text x="285" y="135">X</text>
                                        <text x="160" y="15">Y</text>

                                        <text id="nameX_1" x={`${nameX_1}`} y="142" font-size="11px">-R</text>
                                        <text id="nameX_2" x={`${nameX_2}`} y="142" font-size="11px">R</text>

                                        <text id="nameY_1" x="135" y={`${nameY_1}`} font-size="11px"> R</text>
                                        <text id="nameY_2" x="132" y={`${nameY_2}`} font-size="11px">-R</text>
                                        {dots}
                                    </svg>
                                </fieldset>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td id="td-logout">
                            <Button label="Log out" id="logout-btn" onClick={() => {
                                localStorage.removeItem("user");
                                localStorage.removeItem("password");
                                dispatch(setUserInfo("", ""))
                                dispatch(clearData());
                                dispatch(logOut());
                            }}/>
                        </td>
                        <td id="td-clean">
                            <Button label="Delete results" id="clean-btn" onClick={() => {
                                let data = new FormData();
                                data.set("login", localStorage.getItem("user"));
                                data.set("password", localStorage.getItem("password"));
                                sendRequest("/shots/delete", data, dispatch).then(response => {
                                    if (response.ok) {
                                        dispatch(deleteData())
                                    } else {
                                        return response.text().then(text => dispatch(setState(text)));
                                    }
                                }).catch(err => console.log(err));
                            }}/>
                        </td>
                    </tr>
                </table>
                <table id="table-down">
                    {results}
                </table>
            </div>
        );
    }
}

export default Main;