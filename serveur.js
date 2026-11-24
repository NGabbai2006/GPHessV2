import { bdd } from './src/expresso/bdd';

bdd.connect((err) => {
	if (err) { console.error(err); return; }
	console.log("Connecté à la BDD");
}); 

require('./src/serialport/serialport')("COM10", bdd)