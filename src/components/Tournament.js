// Tournament.js
import React, { useState } from 'react';
import Bracket from './Bracket';
import simulateGame from '../simulateGame';

const Tournament = () => {
  const [bracket, setBracket] = useState(createInitialBracket());
  const [tournamentResults, setTournamentResults] = useState([]);

  function createInitialBracket() {
    // Logic to create a bracket with seeds 1 through 16 in four conferences
    // This should return an array of games with topSeed and bottomSeed properties

    // Create an array to hold the initial games
    let initialGames = [];
    // Assuming four conferences, each with seeds 1 to 16
    for (let conference = 1; conference <= 4; conference++) {
      // Create matchups for each conference
      for (let seed = 1; seed <= 8; seed++) {
        initialGames.push({
          id: `C${conference}S${seed}`, // Unique identifier for each game
          topSeed: seed,
          bottomSeed: 17 - seed,
          conference: conference,
        });
      }
    }
    return initialGames;
  }

  const simulateTournament = () => {
    let currentBracket = [...bracket];
    let results = [];
    let roundNumber = 1;
  
    while (currentBracket.length > 1) {
      let nextRound = [];
      let roundResults = [];
  
      // Simulate each game in the current round
      for (let i = 0; i < currentBracket.length; i += 2) {
        const game1 = currentBracket[i];
        const game2 = currentBracket[i + 1];
        const winnerSeed1 = simulateGame(game1.topSeed, game1.bottomSeed);
        const winnerSeed2 = simulateGame(game2.topSeed, game2.bottomSeed);
        const isUpset1 = winnerSeed1 > game1.topSeed;
        const isUpset2 = winnerSeed2 > game2.topSeed;
  
        // Store the results of each game
        roundResults.push({
          id: `R${roundNumber}G${i/2}`, // Unique identifier for each game in the round
          topSeed: game1.topSeed,
          bottomSeed: game1.bottomSeed,
          winner: winnerSeed1,
          isUpset: isUpset1
        });
        roundResults.push({
          id: `R${roundNumber}G${(i/2)+1}`, // Unique identifier for the next game
          topSeed: game2.topSeed,
          bottomSeed: game2.bottomSeed,
          winner: winnerSeed2,
          isUpset: isUpset2
        });
  
        // Prepare the matchup for the next round
        nextRound.push({
          id: `R${roundNumber+1}G${i/4}`, // Unique identifier for each game in the next round
          topSeed: winnerSeed1,
          bottomSeed: winnerSeed2,
          conference: game1.conference // Assuming we keep track of the conference
        });
      }
  
      // Add the results of this round to the overall results
      results = results.concat(roundResults);
      // Set up the next round
      currentBracket = nextRound;
      roundNumber++;
    }
  
    // Set the final results of the tournament
    setTournamentResults(results);
    setBracket(currentBracket); // Set the final winner
  };  

  const resetTournament = () => {
    setBracket(createInitialBracket()); // Reset bracket to initial state
    setTournamentResults([]); // Clear tournament results
  };

  return (
    <div>
      <Bracket bracket={bracket} setBracket={setBracket} />
      <button onClick={simulateTournament}>Simulate Entire Tournament</button>
      <button onClick={resetTournament}>Reset Tournament</button>
      <div className="tournament-results">
        {tournamentResults.map((game, index) => (
          <div key={index} className="game-result">
            <div>Game {index + 1}: Seed {game.topSeed} vs Seed {game.bottomSeed}</div>
            <div>Winner: {game.isUpset ? <strong>Seed {game.winner}</strong> : `Seed ${game.winner}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournament;