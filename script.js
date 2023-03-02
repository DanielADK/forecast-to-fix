function getData() {
    $.get("https://api.open-meteo.com/v1/forecast?latitude=" 
        + $("#lati")[0].value 
        + "&longitude=" + $("#long")[0].value 
        + "&hourly=temperature_2m,relativehumidity_2m,rain,surface_pressure,visibility,winddirection_10m&timeformat=unixtime", function(data) {
        forecast_temperature = data["hourly"]["temperature_2m"];
        forecast_humidity = data["hourly"]["relativehumidity_2m"];
        forecast_pressure = data["hourly"]["surface_pressure"];
        forecast_visibility = data["hourly"]["visibility"];
        forecast_wind_direction = data["hourly"]["winddirection_10m"];
        forecast_rain = data["hourly"]["rain"];
        forecast_times = data["hourly"]["time"];
        
        $("#teplota").find('tbody').empty();
        $("#dest").find('tbody').empty();

        for (i = 0; i < forecast_temperature.length; i=i+8) {
            time = new Date(forecast_times[i]*1000);
            $("#teplota").find('tbody')
                .append($('<tr>')
                    .append($('<td>')
                        .append(
                            time.toLocaleDateString("cs-CZ") + " " +
                            time.toLocaleTimeString("cs-CZ")
                            )
                    )
                    .append($('<td>')
                        .append(forecast_temperature[i] + " °C")
                    )
                    .append($('<td>')
                        .append(forecast_humidity[i] + " %")
                    )
                    .append($('<td>')
                        .append(forecast_rain[i] + " mm")
                    )
                    .append($('<td>')
                        .append(forecast_pressure[i] + " hPa")
                    )
                    .append($('<td>')
                        .append(forecast_visibility[i] + " m")
                    )
                    .append($('<td>')
                        .append(forecast_wind_direction[i] + " °")
                    )
                );
        }
    });
}
$(function(){
    setInterval(getData, 100);
});