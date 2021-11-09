import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
    name: String,
    country: String,
    continent: String,
    image: String
});

const City = mongoose.model('City', citySchema);

export default City;