import React, { useState } from 'react';
import simulateGame from '../simulateGame';

const Game = ({ game, bracket, setBracket }) => {
  // Add state to track if the current game is an upset
  const [isUpset, setIsUpset] = useState(false);

  const handleGameSimulation = () => {
    const winnerSeed = simulateGame(game.topSeed, game.bottomSeed);
    const currentIsUpset = winnerSeed > game.topSeed; // Check if the result is an upset
    setIsUpset(currentIsUpset);
    
    // Create a new bracket array with the winner updated
    const updatedBracket = bracket.map(g => {
      if (g.id === game.id) {
      //if (g.topSeed === game.topSeed && g.bottomSeed === game.bottomSeed) {
        // Update the game with the winner
        return { ...g, winner: winnerSeed, isUpset: currentIsUpset };
      }
      return g;
    });

    // Set the new bracket state
    setBracket(updatedBracket);
  };

  return (
    <div className="game">
      <div>
        Seed {game.topSeed} vs Seed {game.bottomSeed}
      </div>
      <button onClick={handleGameSimulation}>Simulate Game</button>
      {game.winner && (
        <div>
          Winner: Seed {isUpset ? <strong>{game.winner}</strong> : game.winner}
        </div>
      )}
    </div>
  );
};

export default Game;