const JULY_2017 = 1498878000 * 1000;

let time = [];
let altitude = [];
let pace = [];
let hr = [];
let speed = [];
let distance = [];
let heartrate = [];


for (let i = 0; i < 80; i++) {

	if(i < 40 || i > 55)
	{
		time.push(JULY_2017 + (60*60*24 * i * 1000));
		altitude.push(5 + (Math.random() * 50));
		pace.push(0);
		hr.push(0);
		speed.push(0);
		distance.push(0);
		heartrate.push(0);
	}else{
		//altitude.push(0);
	}

		
}

const data = {
	time,
	altitude,
	pace, 
	hr, 
	speed,
	distance,
	heartrate,
};


module.exports = data;