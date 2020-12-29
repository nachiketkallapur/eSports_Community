import React from 'react';
import gameImage from '../../images/game.jpg';
import './homepage.styles.scss';
import header from '../../components/header/header.component';

const HomePage = () => {

    return (
        <div className='homepage'>
            <img className='game-image' src={gameImage} alt='game'/>
            {/* <header /> */}
            <h1 className='heading'>Welcome to eSports Community</h1>
        </div>
    )
}

export default HomePage;