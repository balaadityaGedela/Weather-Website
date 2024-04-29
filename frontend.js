try {
    const weather_response = await axios.get(weather_API_URL+"weather",{
        params:{
            lat: location_response.data[0].lat,
            lon: location_response.data[0].lon,
            appid: api_key
        }
    });
    console.log(weather_response.data);
    const str = weather_response.data;   

    if(weather_response.data.weather[0],main == "clouds")
    {
        document.body.style.backgroundColor = "white";
    }

} catch (error) {
    console.log(error.message);
    document.body.style.backgroundColor = "red";
}