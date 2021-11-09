import City from '../models/city.js';

export const getCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
 }

export const createCity = async (req, res) => {
    const city = req.body;

    const newCity = new City(city);
    try {
        await newCity.save();

        res.status(201).json(newCity);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCity = async (req, res) => {
    try {
        const city = req.body;
        const updatedCity = await City.findByIdAndUpdate(req.body._id, city, { new: true });
        res.json(updatedCity);
    }
    catch {
        res.status(409).json({ message: error.message });
    }
}

export const deleteCity = async (req, res) => {
    try {
        const deletedCity = await City.findByIdAndRemove(req.body._id);
        res.status(201).json(deletedCity);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}