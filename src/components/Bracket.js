import React from 'react';
import Game from './Game';

const Bracket = ({ bracket, setBracket }) => {
  // Render the bracket visually
  return (
    <div className="bracket">
      {bracket.map((game, index) => (
        <Game key={index} game={game} bracket={bracket} setBracket={setBracket} />
      ))}
    </div>
  );
};

export default Bracket;