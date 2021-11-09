import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Logo from './Logo.js';

import perfectImage from '../images/poggers.jpg';
import niceImage from '../images/pepehype.png';
import okayImage from '../images/pepeneutral.jpg';
import badImage from '../images/pepesad.jpg';
import horribleImage from '../images/pepehands.jpg';

function EndPage({numCorrect, quizLength}) {

    const accuracy = (numCorrect / quizLength * 100).toFixed(0);

    const generateScoreMessage = (playerScore) => {
        if (playerScore == 100.00)
            return 'You got a perfect score! You are too good!';
        if (playerScore > 80)
            return 'Nice job! You are clearly a geography expert.';
        if (playerScore > 50)
            return 'Not bad, you managed to get more than half correct.';
        if (playerScore > 20)
            return 'Well, at least you got something right.';
        return 'Were you even trying?';
    }

    const generateScoreImage = (playerScore) => {
        if (playerScore == 100.00)
            return perfectImage;
        if (playerScore > 80)
            return niceImage;
        if (playerScore > 50)
            return okayImage;
        if (playerScore > 20)
            return badImage;
        return horribleImage;
    }

    return(
        <div id='end-page-background'>
            <Logo />
            <h1 id="end-page-header" style={{marginTop: '2%'}}>Congratulations on finishing the quiz!</h1>
            <div id="final-stats-container">
              <h2>Stats</h2>
              <h4>Cities seen: {quizLength}</h4>
              <h4>Number of correct guesses: {numCorrect}</h4>
              <h4>Number of incorrect guesses: {quizLength - numCorrect}</h4>
              <h4>Accuracy: {(numCorrect / quizLength * 100).toFixed(2) + "%"}</h4>
              <h4>Final Score: {accuracy * 4.86}</h4>
            </div>
            <img id='ending-score-image' src={generateScoreImage(accuracy)}></img>
            <h2 style={{color: 'white', marginTop: '2%', marginBottom: '1.5%'}}>{generateScoreMessage(accuracy)}</h2>
            <Link to='/'>
                <Button>Play again</Button>
            </Link>
        </div>
    );
}

export default EndPage;