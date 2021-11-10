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

  const updateScore = (val) => {
    console.log(val)
    setScore(val);
  }

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
