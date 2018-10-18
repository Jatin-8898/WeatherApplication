$(document).ready(function(){

    particlesJS.load('particles-js', 'particlesjs-config.json', function () {
        //console.log('callback - particles.js config loaded');
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            //latitude and longitude round of values to fixed 2 decimals
            var Latitude = parseFloat(Math.round(position.coords.latitude * 100) / 100).toFixed(2);
            console.log(Latitude);    //19.22

            var Longitude = parseFloat(Math.round(position.coords.longitude * 100) / 100).toFixed(2);
            console.log(Longitude);   //73.17

            var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + Latitude + "&lon=" + Longitude + "&id=524901&appid=72d033c4b23f8966e8c72fae36a7c9e3";

            $.getJSON(api, function (json) {

                $('.city').html(json.name + ", " + json.sys.country);
                $('.weather-status').html(json.weather[0].main + " / " + json.weather[0].description);

               
                switch (json.weather[0].main) {
                    case "Clouds":
                        $('.weather-icons').addClass("wi wi-cloudy");
                        break;

                    case "Clear":
                        $('.weather-icons').addClass("wi wi-day-sunny");
                        break;

                    case "Thunderstorm":
                        $('.weather-icons').addClass("wi wi-thunderstorm");
                        break;

                    case "Drizzle":
                        $('.weather-icons').addClass("wi wi-rain-mix");
                        break;

                    case "Rain":
                        $('.weather-icons').addClass("wi wi-rain");
                        break;

                    case "Snow":
                        $('.weather-icons').addClass("wi wi-snowflake-cold");
                        break;

                    case "Haze":
                        $('.weather-icons').addClass("wi wi-day-haze");
                        break;
                }

                temperature = (json.main.temp - 273);
                $('.temperature').html(Math.round(temperature));

                $('.windspeed').html(json.wind.speed + " Km/h")

                $('.humidity').html(json.main.humidity + " %");

                $('.pressure').html(json.main.pressure + " hPa");

            }); 
        });
    } else {
        $(".city").html("Please grant the permission for Location in Browser.")
    }


});

