# quicksmoothie
Plot device motion and gyro live using [smoothie charts](http://smoothiecharts.org/) and [gyro.js](https://github.com/tomgco/gyro.js).

Device with accelerometer sends sensor data to socket server, who broadcasts to all other devices. IN this way the motion of a phone can be plotted on a desktop.

## Try it
- copy public/ to mobile, open index.html for charts on phone
- or run app.js with node (npm install first) and stream to server.

## Packages:
- node.js
- express 
- socket.io
- gyro.js
- smoothie charts


## Aim: 
learn what signals from accelerometer cna be used for controls.

##TODO
- add gyro data
- better delay / timing
- legend
- stream sensors data with socket.io


