var player;
loadInstruments(function() {
  player = new Player(31.0);
  console.log(instruments);
  clearScreen();
  createTable();
  createButtons();
})
