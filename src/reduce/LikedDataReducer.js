const defaultlikeArray = []

 const LikedDataReducer = (instaList = defaultlikeArray, action) => {
    switch(action.type){
        case "LIKE_UPDATE" : const tempPostArray = instaList;
        tempPostArray.push(action.likeArray);
        console.log(action.instalist);
        console.log(tempPostArray);
        // instaList = tempPostArray;
        return tempPostArray;
        default: return instaList;
    }
}

export default LikedDataReducer;
