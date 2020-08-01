import React, { useEffect, useState, useContext } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './FiveDay.css';
import { context } from '../../App';

interface IntrinsicElements {
    data: any;
}

const FiveDay: React.FC<IntrinsicElements> = (props: IntrinsicElements) => {

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;

    const [weatherList, setWeatherList] = useState([]);

    useEffect(() => {
        setWeatherList(props?.data?.list);
    }, [props.data])

    if (!weatherList?.length) {
        return <span>Loading...</span>;
    }

    let date = new Date();
    let day = date.getDay();

    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const firstLetterCapital = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={ state ? 'success' : 'primary' } >
                    <IonTitle>5 Day Forecast</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color={ state ? 'light' : 'dark' }>
                <div className="box1">
                    <span className="temp-forecast">Today</span>
                    <span className="temp-forecast">
                        <p>{ parseInt(weatherList[0]?.main.temp) }°C</p>
                        <p>{ firstLetterCapital(weatherList[0]?.weather[0]?.description) }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ weatherList[0]?.weather[0].icon }.png` } /></span>
                </div>
                <div className="box2">
                    <span className="temp-forecast">Tomorrow</span>
                    <span className="temp-forecast">
                        <p>{ parseInt(weatherList[7]?.main.temp) }°C</p>
                        <p>{ firstLetterCapital(weatherList[7]?.weather[0].description) }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ weatherList[7]?.weather[0].icon }.png` } /></span>
                </div>
                <div className="box3">
                    <span className="temp-forecast">{ weekday[(day + 2) > 6 ? (day + 2 - 7) : (day + 2)] }</span>
                    <span className="temp-forecast">
                        <p>{ parseInt(weatherList[15]?.main.temp) }°C</p>
                        <p>{ firstLetterCapital(weatherList[15]?.weather[0].description) }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ weatherList[15]?.weather[0].icon }.png` } /></span>
                </div>
                <div className="box4">
                    <span className="temp-forecast">{ weekday[(day + 3) > 6 ? (day + 3 - 7) : (day + 3)] }</span>
                    <span className="temp-forecast">
                        <p>{ parseInt(weatherList[23]?.main.temp) }°C</p>
                        <p>{ firstLetterCapital(weatherList[23]?.weather[0].description) }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ weatherList[23]?.weather[0].icon }.png` } /></span>
                </div>
                <div className="box5">
                    <span className="temp-forecast">{ weekday[(day + 4) > 6 ? (day + 4 - 7) : (day + 4)] }</span>
                    <span className="temp-forecast">
                        <p>{ parseInt(weatherList[31]?.main.temp) }°C</p>
                        <p>{ firstLetterCapital(weatherList[31]?.weather[0].description) }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ weatherList[31]?.weather[0].icon }.png` } /></span>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default FiveDay;
