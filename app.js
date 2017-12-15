$('#search-by-name').on('submit', searchByCity);
$('#search-by-zip').on('submit', searchByZip);

function searchByCity(event) {
  event.preventDefault();
  const cityName = $('#city-name-input').val().replace(/ +, /g, "+");
  returnCityWeatherData(cityName)
}

function returnCityWeatherData(city) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&type=accurate&APPID=99689a8e1e9e9c4a36e72d7867397088"
  $.getJSON(url, function(response) {
    filter(response);
  });
};

function searchByZip(event) {
  event.preventDefault();
  const zipCode = $('#zip-code-input').val()
  returnZipWeatherData(zipCode);
}

function returnZipWeatherData(zip) {
  const url = "https://api.openweathermap.org/data/2.5/weather?zip="+zip+"&units=imperial&type=accurate&APPID=99689a8e1e9e9c4a36e72d7867397088"
  $.getJSON(url, function(response) {
    filter(response);
  });
};

function filter(object) {
  const {clouds, coord, main, sys, weather, wind} = object
  const importantData = {
    'clouds': clouds,
    'coord': coord,
    'main': main,
    'sys': sys,
    'weather': weather,
    'wind': wind
  }
  console.log(importantData)
  updateDom(importantData)
}

function updateDom(weather){
  $('#weather-report').html('');
  const temp = Math.round(weather.main.temp);
  const high = Math.round(weather.main.temp_max);
  const low = Math.round(weather.main.temp_min);

  const sunrise = convertTimestamp(weather.sys.sunrise);
  const sunset = convertTimestamp(weather.sys.sunset);

  $('#weather-report').append(
    `<ul>
      <li>Precipitation: ${weather.clouds.all}%</li>
      <li>Temp: ${temp}&deg;F</li>
      <li>High: ${high}&deg;F</li>
      <li>Low: ${low}&deg;F</li>
      <li>Humidity: ${weather.main.humidity}%</li>
      <li>Longitute: ${weather.coord.lon}</li>
      <li>Latitude: ${weather.coord.lat}</li>
      <li>Sunrise: ${sunrise}</li>
      <li>Sunset: ${sunset}</li>
    </ul>
    `
  )
}

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
	
	time = h + ':' + min + ' ' + ampm;
		
	return time;
}