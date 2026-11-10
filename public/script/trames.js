const trame = "$GPGGA,064036.289,4836.5375,N,00740.9373,E,1,04,3.2,200.2,M,,,,0000*0E"

/*

$GPGGA       : Type de trame
064036.289   : Trame envoyée à 06 h 40 min 36 s 289 (heure UTC)
4836.5375,N  : Latitude 48,608958° Nord = 48° 36' 32.25" Nord
00740.9373,E : Longitude 7,682288° Est = 7° 40' 56.238" Est
1            : Type de positionnement (le 1 est un positionnement GPS)
04           : Nombre de satellites utilisés pour calculer les coordonnées
3.2          : Précision horizontale ou HDOP (Horizontal dilution of precision)
200.2,M      : Altitude 200,2, en mètres
,,,,,0000    : D'autres informations peuvent être inscrites dans ces champs
*            : séparateur de checksum
0E           : Somme de contrôle de parité, un simple XOR sur les caractères entre $ et *

*/

const ntrame = trame.split(",");
const type_de_trame = ntrame[0];
const heure = ntrame[1];
const latitude = ntrame[2] + ' ' + ntrame[3];
const longitude = ntrame[4] + ' ' + ntrame[5];
const type_positionnement = ntrame[6];
const nombre_de_sattelites = ntrame[7];
const altitude = ntrame[9];

console.log(`Type de trame : ${type_de_trame}`);
console.log(`Heure (UTC) : ${heure}`);
console.log(`Latitude : ${latitude}`);
console.log(`Longitude : ${longitude}`);
console.log(`Altitude : ${altitude}`);
console.log(`Type de positionnement : ${type_positionnement == 1 ? "GPS" : "Autre"}`);
console.log(`Nombre de satellites : ${nombre_de_sattelites}`);
