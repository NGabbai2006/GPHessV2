import {LeafletMap, TileLayer, Marker, Polyline, Polygon, Popup} from '../leaflet/leaflet.js';
const map = new LeafletMap('map').setView([50.419456, 1.575165], 11);

const tiles = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const points = [
	[5022.5107, 160.3967],
	[5023.6107, 158.7015],
	[5025.1861, 156.6503],
	[5025.7349, 154.2812],
	[5027.3260, 153.1998],
	[5029.2127, 153.1742],
	[5030.7917, 153.5688],
	[5032.6715, 154.0238],
	[5034.7204, 154.4787],
	[5036.4400, 155.1739],
	[5036.8285, 159.1992],
	[5038.3506, 157.5001],
	[5039.3025, 156.1482],
	[5040.7416, 155.5962],
	[5041.9830, 156.1059],
	[5043.5218, 156.6036],
	[5045.2572, 156.9130],
	[5047.1929, 157.2105],
	[5048.6914, 157.4046],
	[5050.2678, 157.5400],
	[5051.7114, 157.4794],
	[5053.5210, 158.1106],
	[5054.1421, 160.0467],
	[5056.4056, 157.8373]
];

for (var i = 0; i < points.length; i++) {
	points[i][0] /= 100;
	points[i][1] /= 100;
	const marker = new Marker([points[i][0], points[i][1]]).addTo(map);
}

for (var i = 0; i < points.length - 1; i++) {
	const polyline = new Polyline([
		[points[i][0], points[i][1]],
		[points[i+1][0], points[i+1][1]]
	]).addTo(map);
}

function onMapClick(e) {
	new Popup()
		.setLatLng(e.latlng)
		.setContent(e.latlng.toString())
		.openOn(map);
}

map.on('click', onMapClick);