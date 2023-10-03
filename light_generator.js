const mongoose = require('mongoose');
const Light = require('./models/sensor');

// Connect to MongoDB
mongoose.connect('mongodb+srv://dbrett:11Mongo11@sit729.to56xpg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    sensortest(); // Call it once to generate 5 lights
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

function sensortest() {
  for (let i = 0; i < 1; i++) { // Generate 5 lights
    const light = {
      room: 'Front Office',
      name: 'SmartLight_1',
      readings: [], 
    };

    for (let j = 0; j < 24; j++) { // Generate 24 readings for each light for 24 hours of the day
      const brightness_low = 200; // 200 lumen minimum
      const brightness_high = 1000; // 1000 lumen maximum
      const timer_low = 10; // 10 minute timer minimum
      const timer_high = 60; // 1-hour timer maximum

      const random_brightness = Math.floor(Math.random() * (brightness_high - brightness_low) + brightness_low);
      const random_timer = Math.floor(Math.random() * (timer_high - timer_low) + timer_low);
      const currentTime = Date.now(); 

      light.readings.push({
        brightness: random_brightness,
        timer: random_timer,
        time: currentTime, 
      });
    }

    const jsonString = JSON.stringify(light);
    console.log(jsonString);

    const newLight = new Light({
      room: light.room,
      name: light.name,
      readings: light.readings,
    });

    newLight.save()
      .then((doc) => {
        console.log(doc);
      })
      .catch((error) => {
        console.error('Error saving document:', error);
      });
  }
}

// Call sensortest every 10 seconds
const interval = setInterval(sensortest, 10000);
