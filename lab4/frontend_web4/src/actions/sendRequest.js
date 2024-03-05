// const defaultAddress = "http://localhost:26812/backend_web4-1.0-SNAPSHOT/app"
const defaultAddress = "http://localhost:26801/app"

function sendRequest(url, data) {
    return fetch(defaultAddress + url, {
        method: "POST",
        body: data
    }).then(response => {
        return response;
    }).catch(err => console.log(err))
}

function preparations(data) {
    localStorage.setItem("user", data.get("login").toString());
    localStorage.setItem("password", data.get("password").toString());
    let formData = new FormData();
    formData.set("login", data.get("login").toString());
    formData.set("password", data.get("password").toString());
    return sendRequest("/shots/get", formData);
}

export {preparations};
export default sendRequest;