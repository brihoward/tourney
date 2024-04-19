const simulateGame = (topSeed, bottomSeed) => {
    const totalFlips = topSeed + bottomSeed;
    let topSeedScore = 0;
    let bottomSeedScore = 0;
  
    for (let i = 0; i < totalFlips; i++) {
      const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';
      if (flipResult === 'heads') topSeedScore++;
      if (flipResult === 'tails') bottomSeedScore++;
  
      if (topSeedScore === topSeed) return topSeed;
      if (bottomSeedScore === bottomSeed) return bottomSeed;
    }
  };
  
  export default simulateGame;