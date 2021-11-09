import React, { useState, useEffect } from 'react';
import {  useDispatch } from 'react-redux';

import FileBase from 'react-file-base64';
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownButton, Alert } from 'react-bootstrap';

import Logo from './Logo.js';

import { updateCity } from '../actions/cities';

export default ({cityList}) => {
    const [cityData, setCityData] = useState({
        name: '',
        country: '',
        continent: '',
        image: '',
        _id: ''
    });

    const [selectedCity, setSelectedCity] = useState();
    const [warning, setWarning] = useState("");
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedCity == null) {
            alert("Please select a city to update!");
            return;
        }
        for (let prop in cityData) {
            if (cityData[prop] == '') {
                setWarning(prop + " cannot be empty!");
                setSuccess(false);
                return;
            }
        }
    
        dispatch(updateCity(cityData));
        setSelectedCity(null);
        setSuccess(true);
        clearForm();
    }

    const clearForm = () => {
        setCityData({
            name: '',
            country: '',
            continent: '',
            image: '',
            _id: ''
        });
    }

    const handleDropdownClick = (city) => {
        setSelectedCity(city);
        clearForm();
        setCityData({...cityData, _id: city._id})
    }

    useEffect(() => {
        console.log(cityData);
        console.log(selectedCity);
    });

    return(
        <div className='form-page-background'>
          <Logo />
          {warning != "" &&
              <Alert variant='danger'>{warning}</Alert>
          }
          {success && 
              <Alert variant='success'>City successfully updated</Alert>
          }
          <h1 className="form-title">Update City</h1>
          <DropdownButton id="update-city-dropdown" title="Pick a city to update">
            {cityList.map((city, i) => (
                <div key={i}>
                  <Dropdown.Item onClick={() => handleDropdownClick(city)}>{city.name}</Dropdown.Item>
                </div>
            ))}
          </DropdownButton>
          <form onSubmit={handleSubmit} className='city-form'>
            <label>City Name</label>
            <input className='form-control' type='text' placeholder={selectedCity == null ? 'Tokyo' : selectedCity.name} value={cityData.name} onChange={(e) => setCityData({ ...cityData, name: e.target.value })} ></input>
            <label>Country</label>
            <input className='form-control' type='text' placeholder={selectedCity == null ? 'Japan' : selectedCity.country} value={cityData.country} onChange={(e) => setCityData({ ...cityData, country: e.target.value })} ></input>
            <label>Continent</label>
            <input className='form-control' type='text' placeholder={selectedCity == null ? 'Asia' : selectedCity.continent} value={cityData.continent} onChange={(e) => setCityData({ ...cityData, continent: e.target.value })}></input>
            <label>Image</label>
            <div>
              <FileBase
                  type='file'
                  multiple={false}
                  onDone= {({base64}) => setCityData({ ...cityData, image: base64})}
              />
            </div>
            <Button className='form-btn' type='submit'>Submit</Button>
          </form>
          <Link to='/' style={{marginTop: '2rem'}}>
            <Button className='form-btn'>Main Menu</Button>
          </Link>
        </div>
    )
}