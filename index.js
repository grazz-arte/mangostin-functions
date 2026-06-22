// index.js - Adaptado para Azure Flex Consumption
const path = require('path');

// Carrega as funções garantindo que o caminho absoluto seja exato dentro do pacote zipado
require(path.join(__dirname, 'src', 'functions', 'notify.js'));
require(path.join(__dirname, 'src', 'functions', 'anniversary.js'));
require(path.join(__dirname, 'src', 'functions', 'sendtest.js'));
