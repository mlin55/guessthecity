import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export default (cities = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE: 
            return [...cities, action.payload];
        default:
            return cities;
    }
}