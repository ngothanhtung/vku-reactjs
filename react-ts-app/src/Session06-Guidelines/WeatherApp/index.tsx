import { useEffect, useState } from "react";
import styles from "./WeatherApp.module.css";

interface IWeather {
  location: {
    name: string;
  };
  current: {
    temp_c: string;
    condition: {
        text: string;
        icon: string
    },
    wind_mph: number;
    humidity: number;
  };
}
interface IHourly {
  hour: {
    time: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string
    },
  }[]
}
interface IWeatherHourly {
  forecast: {
    forecastday: IHourly[]
  }
}
const WeatherApp = () => {
  const [currentCity, setCurrentCity] = useState("Da nang");
  const [newCity, setNewCity] = useState(currentCity);
  const [currentWeather, setCurrentWeather] = useState<null | IWeather>(null);
  const [hourlyWeather, setHourlyWeather] = useState<null | IWeatherHourly>(null);

  const onHandleSubmit = (e) => {
    e.preventDefault()
    setCurrentCity(newCity);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=c9a0ca46550648b29ce125849232709&q=${currentCity}&aqi=no&lang=vi`
      );
      const data = await response.json();
      if (response.ok) {
        setCurrentWeather(data);
      }
    };
    fetchData();
  }, [currentCity]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=${currentCity}&days=1&aqi=no&alerts=no&lang=vi`
      );
      const data = await response.json();
      if (response.ok) {
        setHourlyWeather(data);
      }
    };
    fetchData();
  }, [currentCity]);

  console.log('<<=== 🚀 hourlyWeather ===>>',hourlyWeather);
  return (
    <div className={styles.screen}>
      <div className={styles.main_content}>
        <form className="flex" onSubmit={onHandleSubmit}>
          <input
            className="flex-1"
            type="text"
            value={newCity}
            onChange={(e) => {
              setNewCity(e.target.value);
            }}
          />
          <button className="btn_ghost w-[40px]" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-search-icon lucide-search"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </button>
        </form>
        <div className="temp_display flex">
          <div className="temp flex-1">
             <h1 className="text-7xl">
              {currentWeather?.current.temp_c}℃
            </h1>
            <p>{currentWeather?.current.condition.text}</p>
          </div>
          <div className="icon flex-1 flex justify-center">
              <img src={currentWeather?.current.condition.icon} alt="" />
          </div>
        </div>
        <div className="weather_extra flex mt-5 bg-white opacity-75 rounded-lg text-slate-700">
            <div className="humidity flex-1 flex flex-col gap-y-3 items-center">
               <span className="text-slate-700">Humidity</span>
               <span className="text-slate-700">{currentWeather?.current.humidity}</span>
            </div>
            <div className="wind flex-1 flex flex-col gap-y-3 items-center">
              <span>Wind</span>
              <span>{currentWeather?.current.wind_mph}</span>
            </div>
        </div>
        <div className="weather_hourly overflow-x-auto">
          <div className="whitespace-nowrap">
            {
              hourlyWeather && hourlyWeather.forecast.forecastday[0].hour?.map((w)=>{
                return (
                   <div className="item w-[100px] inline-block">
                    <span>{w.time}</span>
                    <span>{w.temp_c}</span>
                    <span><img src={w.condition.icon} alt="" /></span>
              </div>
                )
              })
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
