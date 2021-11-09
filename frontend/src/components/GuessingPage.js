import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import Logo from './Logo.js';


function GuessingPage({cityList, updateScore, quizLength, setNumCorrect}) {

    console.log(cityList);
    console.log(quizLength);

    const [state, setState] = useState({
        index: 0,
        gaveAnswer: false,
        userInput: '',
        userSubmit: '',
        correctGuesses: 0,
        incorrectGuesses: 0,
        citiesSeen: 0,
        finishedQuiz: false
    });

    const [hint1, setHint1] = useState(false);
    const [hint2, setHint2] = useState(false);

    useEffect(() => {
        if (state.index == quizLength && !state.finishedQuiz)
        {
            //console.log((state.correctGuesses / state.citiesSeen * 100).toFixed(2));
            updateScore((state.correctGuesses / state.citiesSeen * 100).toFixed(2));
            setState(prevState => ({ ...prevState, gaveAnswer: false, userInput: '', userSubmit: '', finishedQuiz: true}));
            setNumCorrect(state.correctGuesses);
        }
    });
    /*
    const playSong = (song) => {
        let audio = new Audio();
        audio.src = song;

        //wait 100 ms to avoid non-finite error
        setTimeout(() => {
            audio.volume = 0.05;
            audio.currentTime = Math.random() * (audio.duration - 5);
            audio.play();
        }, 100);
        //can only hear song once
        setState(prevState => ({ ...prevState, canClickPlay: false}));

        //stop playing after 5 seconds
        setTimeout(() => {
            audio.pause();
            setState(prevState => ({ ...prevState, canSubmit: true}));
        },
        5000);
    }
    */


    const handleChange = (event) => {
        setState(prevState => ({...prevState, userInput: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(state.userInput);
        setState(prevState => ({...prevState, userSubmit: state.userInput, gaveAnswer: true}));
    }

    const updateStats = (guessedRight) => {
        if (guessedRight) {
            setState(prevState => ({...prevState, correctGuesses: state.correctGuesses + 1, citiesSeen: state.citiesSeen + 1}));
            setHint1(false);
            setHint2(false);
        }
        else {
            setState(prevState => ({...prevState, incorrectGuesses: state.incorrectGuesses + 1, citiesSeen: state.citiesSeen + 1}));
            setHint1(false);
            setHint2(false);
        }

        nextSong();
    }

    const nextSong = () => {
        setState(prevState => ({ ...prevState, gaveAnswer: false, userInput: '', userSubmit: ''}));
        if (state.index < quizLength)
            setState(prevState => ({...prevState, index: state.index + 1}));
    }

    return (
        <div id="guessing-page-background">
          <Logo />
          <div id='stats-box'>
            <h2>Stats</h2>
            <ul>
              <li><h4>Cities seen: {state.citiesSeen}</h4></li>
              <li><h4>Correct: {state.correctGuesses}</h4></li>
              <li><h4>Incorrect: {state.incorrectGuesses}</h4></li>
              <li><h4>Accuracy: {state.citiesSeen == 0 ? 0 : (state.correctGuesses / state.citiesSeen* 100).toFixed(2)}%</h4></li>
            </ul>
          </div>
          {state.index != quizLength && <div id="hint-container">
            <h2 style={{marginBottom: '10%'}}>Hints</h2>
            <p style={{marginBottom: '10%'}}>Click the buttons to reveal hints about the location of the city.</p>
            {!hint1 && <Button className='guessing-page-btn' onClick={() => setHint1(true)}>Hint 1: Continent</Button>}
            {hint1 && <h4 style={{marginBottom: '10%'}}>Continent: {cityList[state.index].continent}</h4>}
            {hint1 && !hint2 && <Button className='guessing-page-btn' onClick={() => setHint2(true)}>Hint 2: Country</Button>}
            {hint2 && <h4 style={{marginBottom: '10%'}}>Country: {cityList[state.index].country}</h4>}
          </div>}
          <div id='main-section'>
              {state.index != quizLength &&
                <div className='guessing-area'>
                  <h1 className="guessing-page-header"  style={{marginTop: '3%', marginBottom: '2%'}}>Guess The City!</h1>
                  <h2 className="guessing-page-header" style={{marginBottom: '3%'}}>City {state.citiesSeen + 1}</h2>
                  <img src={cityList[state.index].image} alt='Pic of music and question marks' id='skyline-image' />
                  {/* Once user has submitted an answer, don't let them resubmit */}
                  {!state.gaveAnswer && 
                    <form onSubmit={handleSubmit} id='guessing-form'>
                        <input className='form-control' style={{maxWidth: '70%'}} value={state.userInput} onChange={handleChange} placeholder='Enter guess here' />
                        <Button type='submit' className='guessing-page-btn' style={{marginLeft: '4%'}}>Make guess</Button>
                    </form>
                  }
                </div>
              }
              {state.finishedQuiz &&
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h2 style={{color: 'white'}}>That's all the questions!</h2>
                  <Link to='/end'>
                    <Button>Click here to end the quiz</Button>
                  </Link>
                </div>
              }
          </div>
          {state.gaveAnswer && 
              <div id='right-or-wrong'>
                <h3>Answer was: </h3>
                <h3 style={{marginBottom: '17%'}}>{cityList[state.index].name}</h3>
                <h3>Your answer: </h3>
                <h3 style={{marginBottom: '17%'}}>{state.userSubmit}</h3>
                <h4 style={{marginBottom: '17%'}}>Were you correct?</h4>
                <span id="yes-or-no-container">
                  <Button onClick={() => updateStats(true)} className = 'guessing-page-btn' style={{marginLeft: 'auto', marginRight: 'auto'}}>Yes</Button>
                  <Button onClick={() => updateStats(false)} className = 'guessing-page-btn' style={{marginLeft: 'auto', marginRight: 'auto'}}>No</Button>
                </span>
              </div>
          }
        </div>
    );
}

export default GuessingPage;