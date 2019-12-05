const request = require('request');

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
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {

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
    // const { latitude, longitude } = JSON.parse(body).data;
    callback(null, {'latitude': data.latitude, 'longitude': data.longitude});
    // callback( {latitude, longitude}, callback)
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
  // fetchMyIP(callback);
  // I can make it work asynchronously by making sure it checks before moving to the next func
  fetchMyIP ((error, ip) => { 
    // first callback fetchMyIP(callback) -> callback happens after fetchMyIP is done as defined in the original function above
    // When it does happen, the callback in fetchMyIP is now (error, ip) => {...} how it looks like below
    if(error) callback(error, null);
    fetchCoordsByIP (ip, (error, location) => { // fetchCoordsByIP
      if(error) callback(error, null);
      fetchISSFlyOverTimes(location, (error, data) => {
        if(error) callback(error, null);
        callback(null, data);
      })
    })
  })
};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

/*
callback: 
  (error, ip) => { 
    if(error) callback(error, null);
    fetchCoordsByIP (ip, (error, location) => { ... }
  }
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      // callback(error, null);
      (error, null) => { 
        if(error) callback(error, null); -> happens
        fetchCoordsByIP (ip, (error, location) => { ... } never happens
      }
      
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      // callback(Error(msg), null);
      (error, null) => { 
        if(error) callback(error, null); -> happens
        fetchCoordsByIP (ip, (error, location) => { ... } never happens
      }
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    (error, null) => { 
      if(error) callback(error, null); -> never happens
      fetchCoordsByIP (ip, (error, location) => { ... } happens
    }
  });
};
*/