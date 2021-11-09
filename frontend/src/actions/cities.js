import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export const getCities = () => async (dispatch) => {

    try {
        const { data } = await api.fetchCities();

        dispatch({ type: FETCH_ALL, payload: data });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const createCity = (city) => async (dispatch) => {
    try {
        const { data } = await api.createCity(city);

        dispatch({ type: CREATE, payload: data });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const deleteCity = (city) => async (dispatch) => {
    try {
        await api.deleteCity(city);
    }
    catch (error) {
        console.log(error.message);
    }
} 

export const updateCity = (city) => async (dispatch) => {
    try {
        await api.updateCity(city);
    }
    catch (error) {
        console.log(error.message);
    }
}