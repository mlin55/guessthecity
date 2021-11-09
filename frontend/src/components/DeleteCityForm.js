import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Button, Alert, Dropdown, DropdownButton } from 'react-bootstrap';

import Logo from './Logo.js';

import { deleteCity } from '../actions/cities';

export default ({cityList}) => {

    const [cityToRemove, setCityToRemove] = useState("");
    const [warning, setWarning] = useState("");
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cityToRemove == "") {
            setWarning("Please select the name of the city you want to delete!");
            return;
        }
        for (let city of cityList) {
            if (city.name == cityToRemove) {
                dispatch(deleteCity(city));
                setSuccess(true);
                clearForm();
                break;
            }
        }
    }

    const handleDropdownClick = (city) => {
        setCityToRemove(city.name);
    }

    const clearForm = () => {
        setCityToRemove("");
    }

    return(
        <div className='form-page-background'>
          <Logo />
          {warning != "" && 
              <Alert variant='danger'>{warning}</Alert>
          }
          {success && 
              <Alert variant='success'>City successfully deleted</Alert>
          }
          <h1 className="form-title">Delete City</h1>
          <div className='city-form' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <DropdownButton id="delete-city-dropdown" title="Pick a city to delete">
                {cityList.map((city, i) => (
                    <div key={i}>
                      <Dropdown.Item onClick={() => handleDropdownClick(city)}>{city.name}</Dropdown.Item>
                    </div>
                ))}
              </DropdownButton>
              <h4 style={{marginBottom: '3%'}}>The city being deleted is: {cityToRemove == '' ? "none selected" : cityToRemove}. Are you sure you want to proceed?</h4>
              <Button className='form-btn' type='submit' onClick={handleSubmit} >Submit</Button>
          </div>
          <Link to='/' style={{marginTop: '2%'}}>
              <Button className='form-btn'>Main Menu</Button>
          </Link>
        </div>
    );
}