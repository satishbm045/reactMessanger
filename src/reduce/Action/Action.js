// import axios from 'axios';

export const UpdateAllData = (userData) => {
    // console.log(PostArray);
    return {
        type: "WHOLE_DATA",
        userData: userData
    }
}

export const loginData = (data) => {
    // console.log(PostArray);
    return {
        type: "OUR_DATA",
        ourdata: data
    }
}

export const UpdateFriendsData = (tempArray) => {
    console.log(tempArray);
    // return {
    //     type: "Message",
    //     tempArray: tempArray
    // }
}