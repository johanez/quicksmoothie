
// Randomly add a data point every 500ms
var tsx = new TimeSeries();
var tsy = new TimeSeries();
var tsz = new TimeSeries();
//
gyro.frequency = 100;
gyro.startTracking(function(o) {
	var f = document.getElementById('gyrofeatures');
	var b = document.getElementById('gyroreadout');

	f.innerHTML = gyro.getFeatures();
	//if (o.x){
		t = new Date().getTime();
		tsx.append(t, o.x);
		tsy.append(t, o.y);
		tsz.append(t, o.z - 9.81);
		b.innerHTML = 	"<p> x = " + o.x + "</p>" +
						"<p> y = " + o.y + "</p>" +
						"<p> z = " + o.z + "</p>" +
						"<p> alpha = " + o.alpha + "</p>" +
						"<p> beta = " + o.beta + "</p>" +
						"<p> gamma = " + o.gamma + "</p>";
	//} else {
	//	b.innerHTML = "<p> No data... </p>"
	//	random.append(new Date().getTime(), 0);
	//}

	

});


// setInterval(function() {
//   random.append(new Date().getTime(), Math.random() * 10000);
// }, 500);

 function createTimeline() {
   var chart = new SmoothieChart({millisPerPixel:50});
   chart.addTimeSeries(tsx, { 	strokeStyle: 'rgba(0, 255, 0, 1)', 
   							 	fillStyle: 'rgba(0, 255, 0, 0.2)', 
   							 	lineWidth: 2 });
   chart.addTimeSeries(tsy, { 	strokeStyle: 'rgba(255, 0, 0, 1)', 
   							  	fillStyle: 'rgba(255, 0, 0, 0.2)', 
   							  	lineWidth: 2 });   
   chart.addTimeSeries(tsz, { 	strokeStyle: 'rgba(0, 0, 255, 1)', 
   							  	fillStyle: 'rgba(0, 0, 255, 0.2)', 
   							  	lineWidth: 2 });
   chart.streamTo(document.getElementById("chart"), 500);
 }