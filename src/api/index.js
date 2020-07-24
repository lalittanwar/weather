import axios from 'axios';
import { mainModule } from 'process';

export const fetchWeather = async ( city ) => {

    try {
        const res = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=761054a7adf90be0fd31535e2b0cbf31&units=metric` )
        const modifiedData = {
            temp: res.data.main.temp,
        }
        return modifiedData;
    } catch ( error ) {

    }

}