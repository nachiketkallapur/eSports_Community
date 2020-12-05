import React from 'react';
import gameImage from '../../images/game.jpg';
import './homepage.styles.scss';

const HomePage = () => {

    return (
        <div className='homepage'>
            <img className='game-image' src={gameImage} alt='game'/>
            <h1 className='heading'>Welcome to eSports Community</h1>
        </div>
    )
}

export default HomePage;