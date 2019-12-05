/* const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    fetchCoordsByIP(ip, callback);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  console.log(ip);
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).data;

    fetchISSFlyOverTimes({'latitude': data.latitude, 'longitude': data.longitude}, callback);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Flyover Times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).response;
    callback(error, data);
    
  });
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP(callback);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation }; */