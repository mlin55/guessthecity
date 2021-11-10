import { useState, useEffect } from 'react';

import Logo from './Logo';

import { Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';


function MainPage({cityList, setQuizLength, quizLength}) {
    console.log(cityList);
    const [length, setLength] = useState("");
    const [startQuiz, setStartQuiz] = useState(false);
    const [warning, setWarning] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (length == "") {
            setWarning("Please enter a value in the input field!");
        }
        else if (length % 1 != 0) {
            setWarning("Please enter a whole number in the input field!");
        }
        else if (length <= 0) {
            setWarning("The quiz must have at least one round!");
        } else if (length >= cityList.length) {
            setWarning("The quiz cannot have more than " + cityList.length + " rounds!");
        }
        else {
            console.log("HELLO!");
            setQuizLength(length);
            setStartQuiz(true);
        }
    }
    const handleChange = (e) => {
        setLength(e.target.value);
    }

    useEffect(() => {
        console.log(quizLength);
    }, [quizLength]);

    return(
        <div id='main-page-background'>
          <Logo />
          {warning != "" && <Alert variant='danger'>{warning}</Alert>}
          <h1 className='main-page-header' style={{marginTop: '3%'}}>Welcome to Guess the City!</h1>
          <h2 className='main-page-header'>How to Play: </h2>
          <h4 id = 'main-page-description'>As the name suggests, this is a city skyline trivia quiz. On each round, you will be shown the skyline of a random city, and based on the picture, you must guess the city being shown. You then must guess the title of the song. At the end of the quiz, your score will be determined based on your accuracy. Try and get as high of a score as you can!</h4>
          {cityList.length == 0 &&
            <h4 style={{color: 'white'}}>Loading quiz, please wait a few seconds!</h4>
          }
          {cityList.length != 0 &&
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmit}>
              <label style={{color: 'white'}}>How many rounds do you want to play? </label>
              <input className='form-control' type="number" placeholder={"Max: " + cityList.length} value={length} onChange={handleChange} ></input>
              <Button type='submit' className='main-page-btn'>Submit</Button>
            </form>
          }
          {startQuiz && <Link to='/quiz'>
            <Button className='main-page-btn'>You're all set! Click here to start playing.</Button>
          </Link>}
          <div id='main-page-button-container'>
            <Link to = '/create-city'>
              <Button className='main-page-btn'>Add a city to the quiz</Button>
            </Link>
            <Link to = '/delete-city'>
              <Button className='main-page-btn'>Delete a city from the quiz</Button>
            </Link>
            <Link to = '/update-city'>
              <Button className='main-page-btn'>Update one of the cities</Button>
            </Link>
          </div>
        </div>
    )
}

export default MainPage;