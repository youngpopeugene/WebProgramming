const dataReducer = (state = [{
    X: "X",
    Y: "Y",
    R: "R",
    script_time: "Script time",
    date: "Date",
    status: "Status"
}], action) => {
    switch (action.type) {
        case "ADD_DATA":
            state.push(action.data);
            return [...state];
        case "SET_DATA":
            return [{
                X: "X",
                Y: "Y",
                R: "R",
                script_time: "Script time",
                date: "Date",
                status: "Status"
            }].concat(action.data);
        case "DELETE_DATA":
            return [{
                X: "X",
                Y: "Y",
                R: "R",
                script_time: "Script time",
                date: "Date",
                status: "Status"
            }];
        default:
            return state;
    }
}

export default dataReducer;