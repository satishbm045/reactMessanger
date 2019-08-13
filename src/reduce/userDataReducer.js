const defaultData = []

export const userDataReducer = (userData = defaultData, action) => {
    switch(action.type){
        case "WHOLE_DATA": let tempDataArray = userData;
        tempDataArray = action.userData;
        console.log(tempDataArray);
        return tempDataArray;
        default: return userData;
    }
}

const defaultOurData = []

export const ourDataReducer = (ourData = defaultOurData, action) => {
    switch(action.type){
        case "OUR_DATA": let tempOurDataArray = ourData;
        tempOurDataArray = action.ourdata;
        console.log(tempOurDataArray);
        return tempOurDataArray;
        default: return ourData;
    }
}

export const allUserDataReducer = (userData = {
        loading: false, 
        data: [], 
        error: null 
    }, action) => {

    switch (action.type) {
        case "ALL_DATA_LOADING": return {...userData, loading: true}
        case "ALL_DATA_SUCCESS": return {...userData, loading: false, data: action.data}
        case "ALL_DATA_ERROR": return {...userData, loading: false, error: action.err}
        default: return userData;
    }
}

export const addDataReducer = (addData = {
    loading: false, 
    data: [], 
    error: null 
}, action) => {

    switch (action.type) {
        case "ADD_LOADING": return {...addData, loading: true}
        case "ADD_SUCCESS": return {...addData, loading: false, data: action.data}
        case "ADD_ERROR": return {...addData, loading: false, error: action.err}
        default: return addData;
    }
}

