import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(urlencoded({extended:true}));
app.use(express.static("public"));

const api_key = "b53cd1650eeddf3eccfbda8169cf652a";
const location_API_URL = "http://api.openweathermap.org/geo/1.0/";
const weather_API_URL = "https://api.openweathermap.org/data/2.5/";
var icon_img_url_0 = "https://openweathermap.org/img/wn/"
var icon_img_url_1 = "@2x.png"

const port = 3000;
var background_color = "";

app.get("/",async (req,res)=>
{
    res.render("index.ejs",{backgroundColor:background_color});
});

var lat = "";
var lon = "";
var country = "";
var state = "";
var location_response = "";
app.post("/submit", async (req,res)=>
{      
    try {
        location_response = await axios.get(location_API_URL+"direct",{
            params:{
                q: req.body.cityName,
                appid: api_key
            }
        });
        console.log(location_response.data[0].name);
        // res.render("index.ejs",{lat: location_response.data[0].lat,
        //     lon: location_response.data[0].lon,
        //     country:location_response.data[0].country,
        //     state: location_response.data[0].state});
        try {
            weather_response = await axios.get(weather_API_URL+"weather",{
                params:{
                    lat: location_response.data[0].lat,
                    lon: location_response.data[0].lon,
                    appid: api_key
                }
            });
            console.log(weather_response.data);
            const str = weather_response.data;
            var background_color = "white";
            switch(str.weather[0].main)
            {
                case "Clouds":
                    background_color = "skyblue";
                    break;
                case "Rain":
                    background_color = "green";
                    break;
                case "Drizzle" || "Rain":
                    background_color = "seagreen";
                    break;

                case "Thunderstorm" || "Tornado":
                    background_color = "grey";
                    break;
                case "Snow":
                    background_color = "white";
            }
            console.log(background_color);
            res.render("index2.ejs",{
                img_url: icon_img_url_0 + str.weather[0].icon +icon_img_url_1,
                main:str.weather[0].main,
                description:str.weather[0].description,
                temp:String(str.main.temp - 273.15).slice(0,4)+" *C",
                feels_like:String(str.main.feels_like - 273.15).slice(0,4)+" *C",
                backgroundColor:background_color});   
        } catch (error) {
            console.log(error.message);
            res.render("index2.ejs",{message: error.message});
        }
    } catch (error) {
        console.log(error.message);
        res.render("index.ejs",{content: error.message});
    }
});

var weather_response = "";

// app.get("/weather", async (req,res)=>
// {
//     try {
//         weather_response = await axios.get(weather_API_URL+"weather",{
//             params:{
//                 lat: location_response.data[0].lat,
//                 lon: location_response.data[0].lon,
//                 appid: api_key
//             }
//         });
//         console.log(weather_response.data);
//         const str = weather_response.data;
//         var background_color = "green";
//         if(str.weather[0].main == "Clouds")
//         {
//             background_color = "skyblue";
//         }
//         console.log(background_color);
//         res.render("index2.ejs",{
//             img_url: icon_img_url_0 + str.weather[0].icon +icon_img_url_1,
//             main:str.weather[0].main,
//             description:str.weather[0].description,
//             temp:String(str.main.temp - 273.15).slice(0,4)+" *C",
//             feels_like:String(str.main.feels_like - 273.15).slice(0,4)+" *C",
//             backgroundColor:background_color});   
//     } catch (error) {
//         console.log(error.message);
//         res.render("index.ejs",{message: error.message});
//     }
// });

app.listen(port,()=>
{
    console.log(`Server started running in ${port}`);
});
