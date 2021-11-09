import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';

import FileBase from 'react-file-base64';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';

import Logo from './Logo';

import { createCity } from '../actions/cities';

function CreateCityForm() {

    const [cityData, setCityData] = useState({
        name: '',
        country: '',
        continent: '',
        image: ''
    });
    const [warning, setWarning] = useState("");
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let prop in cityData) {
            if (cityData[prop] == '') {
                setWarning(prop + " cannot be empty!");
                setSuccess(false);
                return;
            }
        }

        dispatch(createCity(cityData));
        setSuccess(true);
        clearForm();
    }

    const clearForm = () => {
        setCityData({
            name: '',
            country: '',
            continent: '',
            image: ''
        });
        setWarning("");
    }

    return(
        <div className='form-page-background'>
          <Logo />
          {warning != "" && <Alert variant='danger'>{warning}</Alert>}
          {success && <Alert variant='success'>City successfully added</Alert>}
          <h1 className="form-title">Create City</h1>
          <form onSubmit={handleSubmit} className='city-form'>
            <label>City Name</label>
            <input className='form-control' type='text' placeholder='Tokyo' value={cityData.name} onChange={(e) => setCityData({ ...cityData, name: e.target.value })} ></input>
            <label>Country</label>
            <input className='form-control' type='text' placeholder='Japan' value={cityData.country} onChange={(e) => setCityData({ ...cityData, country: e.target.value })} ></input>
            <label>Continent</label>
            <input className='form-control' type='text' placeholder='Asia' value={cityData.continent} onChange={(e) => setCityData({ ...cityData, continent: e.target.value })}></input>
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

export default CreateCityForm;