import axios from 'axios';

// export const fetchWeather = ( city ) => {
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=761054a7adf90be0fd31535e2b0cbf31&units=metric`;
//     return axios.get( url ).then( ( data ) => {
//         const modifiedData = {
//             name: data.name,
//             temp: data.main,
//             main: data?.weather[ 0 ]?.main,
//             humidity: data.main.humidity,
//             pressure: data.main.pressure,
//             wind: data.wind.speed
//         }
//         return modifiedData;
//     } ).catch( ( error ) => {
//         return Promise.reject( error );
//     } );
// }

export const fetchWeather = async ( city ) => {
    try {
        const { data } = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=761054a7adf90be0fd31535e2b0cbf31&units=metric` )
        const modifiedData = {
            name: data.name,
            temp: data.main.temp,
            main: data.weather[ 0 ].main,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed
        }
        return modifiedData;
    } catch ( error ) {
        return Promise.reject( error.response.data.message );
    }
}


export const fetchFiveDayForecast = async ( city ) => {
    try {
        const { data } = await axios.get( `https://api.openweathermap.org/data/2.5/forecast?q=${ city }&appid=761054a7adf90be0fd31535e2b0cbf31&units=metric` )
        const modifiedData = {
            list: data.list
        }
        return modifiedData;
    } catch ( error ) {
        console.log( error.response.data.message )
    }
}