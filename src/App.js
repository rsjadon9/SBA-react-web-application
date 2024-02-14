import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=9d19cbf69c2fd5307162daeb55a46c23`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          console.log(response.data);  // Log the response to inspect its structure

          // Check if expected properties exist
          if (response.data.name && response.data.main && response.data.weather) {
            setData(response.data);
          } else {
            console.error('Unexpected response structure:', response.data);
            // Optionally, you can set an error state or handle it accordingly
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          // Optionally, you can set an error state or handle it accordingly
        })
        .finally(() => {
          setLocation('');
        });
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
              {console.log(data.wind)}
            </div>
          </div>

        }


      </div>
    </div>
  );
}

export default App;
