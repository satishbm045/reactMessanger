import axios from 'axios';

export const UpdateAllData = (userData) => {
    return {
        type: "WHOLE_DATA",
        userData: userData
    }
}

export const loginData = (data) => {
    return {
        type: "OUR_DATA",
        ourdata: data
    }
}



const dataLoading = () => {
    return {
        type: "ALL_DATA_LOADING"
    }
}

const dataSuccess = (data) => {
    return {
        type: "ALL_DATA_SUCCESS",
        data: data
    }
}

const dataError = (err) => {
    return {
        type: "ALL_DATA_ERROR",
        err: err
    }
}

export const GetData = () => {
    return (dispatch) => {
        dispatch(dataLoading());
        axios({
            url: 'https://demomessanger-1032.restdb.io/rest/userdata',
            method: 'GET',
            headers: {
                'x-apikey' : process.env.REACT_APP_API_KEY,
                'Content-Type' : 'application/json'
            }
        }).then((response) => {
            console.log(response);
            dispatch(dataSuccess(response.data));
        })
        .catch((err) => {
            dispatch(dataError(err));
        })
    }
}

export const getAllData = (loggedUser) => {
    return (dispatch) => {
        dispatch(dataLoading());
        axios({
            url: 'https://demomessanger-1032.restdb.io/rest/userdata?q={"_id":{"$not":"'+loggedUser._id+'"}}',
            method: 'GET',
            headers: {
                'x-apikey' : process.env.REACT_APP_API_KEY,
                'Content-Type' : 'application/json'
            }
        }).then((response) => {
            console.log(response);
            dispatch(UpdateAllData(response.data));
        })
        .catch((err) => {
            dispatch(UpdateAllData(err));
        })
    }
}

const UpdateloggedData = (data) => {
    return {
        type: "OUR_DATA",
        ourdata: data
    }
}

export const updateMyData = (myData) => {
    return (dispatch) => {
        axios({
            url: 'https://demomessanger-1032.restdb.io/rest/userdata/'+myData["_id"],
            method: 'GET',
            headers: {
                'x-apikey' : process.env.REACT_APP_API_KEY,
                'Content-Type' : 'application/json'
            }
        }).then((response) => {
            console.log(response);
            dispatch(UpdateloggedData(response.data));
        })
        .catch((err) => {
            dispatch(UpdateloggedData(err));
        })
    }
}