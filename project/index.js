var player;
loadInstruments(function() {
  player = new Player(30.0);
  console.log(instruments);
  clearScreen();
  createTable();
  createButtons();
})
