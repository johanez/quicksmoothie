
var tsx = new TimeSeries();
var tsy = new TimeSeries();
var tsz = new TimeSeries();
var tsa = new TimeSeries();
var tsb = new TimeSeries();
var tsg = new TimeSeries();


// connect to socket.io
var socket = io();

// intervall for checkign sensors
gyro.frequency = 100;

function addStep (t, o) {
	var b = document.getElementById('gyroreadout');
	tsx.append(t, o.x);
	tsy.append(t, o.y);
	tsz.append(t, o.z - 9.81);
	tsa.append(t, o.alpha);
	tsb.append(t, o.beta);
	tsg.append(t, o.gamma);
	b.innerHTML = 	"<p> x = " 		+ 	o.x 	+ "</p>" +
					"<p> y = " 		+ 	o.y 	+ "</p>" +
					"<p> z = " 		+ 	o.z 	+ "</p>" +
					"<p> alpha = " 	+	o.alpha + "</p>" +
					"<p> beta = " 	+	o.beta  + "</p>" +
					"<p> gamma = " 	+	o.gamma + "</p>";
}

gyro.startTracking(function(o) {
	var f = document.getElementById('gyrofeatures');
	f.innerHTML = gyro.getFeatures() ;
	if (o.x) {
		t = new Date().getTime();
		tsx.append(t, o.x);
		socket.emit("step", {t:t, o:o});
		addStep(t, o);
	} else {
		// don't overwrite recieved data!
		//b.innerHTML = "<p> No data... </p>"
	}
});


socket.on('step', function(step){
	//f.innerHTML = 'recieved data!';
    addStep(step.t, step.o);
});


function createTimeline() {
	var chartAcc = new SmoothieChart({millisPerPixel:50 /*speed */});
	chartAcc.addTimeSeries(tsx, { 	strokeStyle: 'rgba(0, 255, 0, 1)', 
								fillStyle: 'rgba(0, 255, 0, 0.2)', 
								lineWidth: 2 });
	chartAcc.addTimeSeries(tsy, { 	strokeStyle: 'rgba(255, 0, 0, 1)', 
								fillStyle: 'rgba(255, 0, 0, 0.2)', 
								lineWidth: 2 });   
	chartAcc.addTimeSeries(tsz, { 	strokeStyle: 'rgba(0, 0, 255, 1)', 
								fillStyle: 'rgba(0, 0, 255, 0.2)', 
								lineWidth: 2 });

	var chartGyro = new SmoothieChart({millisPerPixel:50});
	chartGyro.addTimeSeries(tsa, { 	strokeStyle: 'rgba(0, 255, 0, 1)', 
								 	fillStyle: 'rgba(0, 255, 0, 0.2)', 
								 	lineWidth: 2 });
	chartGyro.addTimeSeries(tsb, { 	strokeStyle: 'rgba(255, 0, 0, 1)', 
								  	fillStyle: 'rgba(255, 0, 0, 0.2)', 
								  	lineWidth: 2 });   
	chartGyro.addTimeSeries(tsg, { 	strokeStyle: 'rgba(0, 0, 255, 1)', 
								  	fillStyle: 'rgba(0, 0, 255, 0.2)', 
								  	lineWidth: 2 });

	chartAcc.streamTo(document.getElementById("chartAcc"), 500 /*delay*/);
	chartGyro.streamTo(document.getElementById("chartGyro"), 500);
}