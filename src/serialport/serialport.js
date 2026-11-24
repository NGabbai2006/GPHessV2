const { SerialPort } = require('serialport');

//$GPGGA,084548,5022.5107,N,00160.3967,E,1,08,0.9,545.4,M,46.9,M, , *42
export function serialport(port, bdd) {
    const serial = new SerialPort({
        path: port,
        baudRate: 9600
    }, (err) => { return console.log(err) });

    serial.on('open', () => {
        serial.on('data', (data) => {
            const dataSplitted = data.split(',');
            const value = dataSplitted[2]/100 + dataSplitted[3] + ',' + (dataSplitted[4]/100).toString().substring(0,7) + dataSplitted[5];
            bdd.query("INSERT INTO gps (timestamp, coordonee) VALUES (NOW(), ?);", [value], (err) => {
                if (err) return console.log(err);

                return console.log("Nouvelle coordonnéee " + value);
            });
        });
    });
}