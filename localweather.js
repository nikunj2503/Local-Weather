$( document ).ready(function() {
    
    getLocation();

    function getLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                getWeather(position.coords.latitude,position.coords.longitude);
            })
        }
    }

    function getWeather(lat,lon) {
        $.ajax({  
            url: "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon,
            method:'GET',
            dataType: "json",
            success: function(response){
               console.log(response);
               displayData(response);

            }
        });
    }

    function displayData(response) {
        var html = "";

        html += "<img src="+response.weather[0].icon+">";
        $('.weatherIcon').html(html);

        html = "";
        html += "<p>"+response.main.temp+" C</p>"
        $('.weather').html(html);

        html = "";
        html = "<p>"+response.name+", "+response.sys.country+"</p>"
        $('.city').html(html);

        html ="";
        html = "<p>"+response.weather[0].description+"</p>";
        $('.weatherDescription').html(html);

        html = "";
        html = "<p>SW "+response.wind.speed+" Knots</p>";
        $('.windSpeed').html(html);

        if(response.weather[0].description === 'clear sky') {
            $('body').css({
                'background-image':'url(clearsky.jpg)',
                'background-size': 'cover'
            });
        } else if(response.weather[0].description === 'scattered clouds') {
            $('body').css({
                'background-image':'url(scatteredClouds.jpg)',
                'background-size': 'cover'
            });
        } else if(response.weather[0].description === 'broken clouds') {
            $('body').css({
                'background-image':'url(brokenClouds.jpg)',
                'background-size': 'cover'
            });
        }
        
    }
    


    
});

