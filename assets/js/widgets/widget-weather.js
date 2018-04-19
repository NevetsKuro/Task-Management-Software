/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: widgets/widget-weather.js;

*/


"use strict";


$(document).ready(function(){

	var skycons = new Skycons({"color": "white"}),
        list  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
        ],
        i;

    skycons.add("variant-1-partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
    skycons.add("variant-1-clear", Skycons.CLEAR_DAY);
    skycons.add("variant-1-sleet", Skycons.SLEET);
    skycons.add("variant-2-rain", Skycons.RAIN);
    skycons.add("clear-day", Skycons.CLEAR_DAY);
    skycons.add("clear-day-2", Skycons.CLEAR_DAY);
    skycons.add("variant-2-day-cloudy", Skycons.CLOUDY);
    skycons.add("variant-2-day-sleet", Skycons.SLEET);
    skycons.add("variant-2-day-clear-day", Skycons.CLEAR_DAY);
    skycons.add("variant-2-day-partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
    skycons.add("variant-2-day-partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
    skycons.add("variant-2-day-snow", Skycons.SNOW);
    skycons.add("variant-2-day-rain", Skycons.RAIN);
    skycons.add("variant-3-day-clear-day", Skycons.CLEAR_DAY);
    skycons.add("variant-3-wind", Skycons.WIND);
    


	for(i = list.length; i--; )
	    skycons.set(list[i], list[i]);

	skycons.play();

    // ---------------------------------------------

    var skycons2 = new Skycons({"color": "#e94164"}),
        list2  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
        ],
        i2;

    skycons2.add("variant-3-cloudy", Skycons.CLOUDY);
    skycons2.add("variant-3-sleet", Skycons.SLEET);
    skycons2.add("variant-3-clear-day", Skycons.CLEAR_DAY);

    for(i2 = list2.length; i2--; )
        skycons2.set(list2[i2], list2[i2]);

    skycons2.play();

});