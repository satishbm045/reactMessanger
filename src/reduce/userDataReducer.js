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


