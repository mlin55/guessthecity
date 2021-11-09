import axios from 'axios';

const url = 'https://guess-the-city.herokuapp.com/cities';

export const fetchCities = () => axios.get(url);
export const createCity = (newCity) => axios.post(url, newCity);
export const deleteCity = (cityToRemove) => axios.post(url + "/" + cityToRemove._id + "/delete", cityToRemove);
export const updateCity = (cityToUpdate) => axios.post(url + "/" + cityToUpdate._id + "/update", cityToUpdate);