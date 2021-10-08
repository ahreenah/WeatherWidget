import Weather from '@/types/Weather';

export default {
    async getWeather(location:string):Promise<Weather> {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7c4d0ca68f7a75b40417068feac3a5d0`);
        const data = await res.json();
        return { 
            ...data.main, 
            icon: data.weather[0].icon,
            feelsLike: data.main.feels_like,
            description: data.weather[0].description,
            wind: data.wind,
            visibility: data.visibility,
        };
    },
        async getCountry(location:string):Promise<string> {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7c4d0ca68f7a75b40417068feac3a5d0`);
        const data = await res.json();
        if (data.sys.country){
            return data.sys.country;
        }
        return '';
    }
};
