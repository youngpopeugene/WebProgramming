const setData = (data = [{
    X: "X",
    Y: "Y",
    R: "R",
    script_time: "Script time",
    date: "Date",
    status: "Status"
}]) => {
    return {
        type: "SET_DATA",
        data: data
    }
}

export default setData;