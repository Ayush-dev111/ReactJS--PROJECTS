import React from 'react'
import { useState, useEffect} from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
const Weather = () => {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(false);
  
  const allIcons = {
    "01d" : clear_icon,
    "01n" : clear_icon,

    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,

    "04d" : drizzle_icon,
    "04n" : drizzle_icon,

    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    
    "13d" : snow_icon,
    "13n" : snow_icon,
  }

  const fetchWeatherData = async (city)=>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      try {
        let response = await fetch(URL);
        let data = await response.json();

        if(!response.ok){
          alert(data.message);
          return;
        }
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        // console.log(data);
        
        setWeather({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
         
      } catch (error) {
        alert(error, "error fetching data");
      }
  }

  useEffect(() => {
    fetchWeatherData('Delhi');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === '') return;
    fetchWeatherData(city);
  };




  return (
    <div className="   card p-4 shadow-sm d-flex flex-column align-items-center bg-dark" style={{ maxWidth: '550px', width: '100%', borderRadius: '10px' }}>

      <h1 className='text-center mb-3' style={{ fontSize: "3rem" }}>🌤️ Weather App</h1>

      <form onSubmit={handleSubmit} className="d-flex justify-content-center mb-2">

        <input
          className='form-control me-2'
          type="text"
          placeholder='Enter your city...'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ maxWidth: '75%' , outline:"none"}}
        />

        <button 
          type="submit" 
          className='btn btn-info d-flex align-items-center' 
          style={{ gap: '8px', padding: '0.5rem 1rem', fontSize: '1rem' }}>
          Search
          <img 
            src={search_icon} 
            alt="search icon" 
            style={{ width: '20px', height: '20px'}} 
          />
        </button>
      </form>

      <img 
        src={weather.icon} 
        alt=""  
        style={{ width: '150px', height: '150px'}}
      />
      <p style={{fontSize: "2rem", margin: "0"}}>{weather.temperature}°C</p>
      <p style={{fontSize: "2rem", margin: "0"}}>{weather.location}</p>

      <div className="weather-data mt-2 d-flex justify-content-between text-center" style={{width:  "100%"}}>
        <div className = 'd-flex align-items-start gap-3 fs-5'>
          <img src={humidity_icon} alt="" className='mt-2'/>
          <div>
            <p className='m-0'>{weather.humidity}°C</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className = 'd-flex align-items-start gap-3 fs-5' >
          <img src={wind_icon} alt=""  className='mt-2'/>
          <div>
            <p  className='m-0'>{weather.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Weather