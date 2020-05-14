var express = require('express');
var router = express.Router();

const raspi = require('raspi');
const pwm = require('raspi-pwm');
const Gpio = require('onoff').Gpio;

var in1 = new Gpio(5, 'out')
var in2 = new Gpio(6, 'out')
raspi.init(() => {
	const led1 = new pwm.PWM('P1-33');
	led1.write(1)
});

var in3 = new Gpio(16, 'out')
var in4 = new Gpio(20, 'out')
raspi.init(() => {
	const led2 = new pwm.PWM('P1-32');
	led2.write(1)
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('TEST');
});

// forward
router.get('/f', function(req, res, next) {
	in1.writeSync(1)
	in2.writeSync(0)

	res.sendStatus(200);
});

// stop
router.get('/s', function(req, res, next) {
	in1.writeSync(0)
	in2.writeSync(0)

	res.sendStatus(200);
});

// rear
router.get('/r', function(req, res, next) {
	in1.writeSync(0)
	in2.writeSync(1)

	res.sendStatus(200);
});


// wheel left
router.get('/wl', function(req, res, next) {
	in3.writeSync(0)
	in4.writeSync(1)

	res.sendStatus(200);
});

// wheel right
router.get('/wr', function(req, res, next) {
	in3.writeSync(1)
	in4.writeSync(0)

	res.sendStatus(200);
});

// wheel stop - neutral
router.get('/ws', function(req, res, next) {
	in3.writeSync(0)
	in4.writeSync(0)

	res.sendStatus(200);
});

module.exports = router;
