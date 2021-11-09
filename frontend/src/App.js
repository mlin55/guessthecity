import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';

import { getCities } from './actions/cities';

import GuessingPage from './components/GuessingPage.js';
import MainPage from './components/MainPage.js';
import EndPage from './components/EndPage.js';
import CreateCityForm from './components/CreateCityForm';
import DeleteCityForm from './components/DeleteCityForm';
import UpdateCityForm from './components/UpdateCityForm';

import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  const [score, setScore] = useState(0);
  const [quizLength, setQuizLength] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  


  /*
  const importAll = (r) => {
    let audio = {};
    r.keys().map( (item, index) => { audio[item.replace('./', '')] = r(item); } );
    return audio;
  }

  const convertToArray = (audioFiles) => {
    let songs = []
    for (let song in audioFiles)
      songs.push({
        audio: audioFiles[song].default,
        name: song.substring(0, song.length - 4)
      })
    //console.log(songs)
    return songs
  }

  //const audioList = convertToArray(importAll(require.context('./audio', true, /\.(mp3)$/)));
  //const audioList = [{audio: demoAudio, name: 'Eastside'}]
  

  const convertToArray = (imageFiles) => {
    let cities = []
    for (let city in imageFiles)
      cities.push({
        image: imageFiles[city].default,
        name: city.substring(0, city.length - 4)
      })
    //console.log(songs)
    return cities;
  }

  const importAll = (r) => {
    let image = {};
    r.keys().map( (item, index) => { image[item.replace('./', '')] = r(item); } );
    return image;
  }
  */

  const updateScore = (val) => {
    console.log(val)
    setScore(val);
  }

  /*
  const updateQuizList = (param) => {
    
  }
  */

  //const quizList = convertToArray(importAll(require.context('./cities', true, /\.(png|jpe?g|svg)$/)))
  const quizList = useSelector((state) => state.cities);
  console.log("RERENDERED APP");

  return(
      <Router>
        <Switch>
          <Route exact path='/'>
            <MainPage cityList={quizList} setQuizLength={setQuizLength} quizLength={quizLength} />
          </Route>
          <Route exact path='/quiz'>
            <GuessingPage cityList={quizList} updateScore={updateScore} quizLength={quizLength} setNumCorrect={setNumCorrect} />
          </Route>
          <Route exact path='/end'>
            <EndPage numCorrect={numCorrect} quizLength={quizLength} />
          </Route>
          <Route exact path='/create-city'>
            <CreateCityForm />
          </Route>
          <Route exact path='/delete-city'>
            <DeleteCityForm cityList={quizList} />
          </Route>
          <Route exact path='/update-city'>
            <UpdateCityForm cityList={quizList} />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
