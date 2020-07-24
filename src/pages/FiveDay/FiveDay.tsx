import React, { useEffect, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './FiveDay.css';
import axios from 'axios';

interface IntrinsicElements {
    location: any;
}


const FiveDay: React.FC<IntrinsicElements> = (props: IntrinsicElements) => {

    const [temp, setTemp] = useState([])
    const [main, setMain] = useState()
    const [humidity, setHumidity] = useState()
    const [pressure, setPressure] = useState()
    const [wind, setWind] = useState()
    const [sunrise, setSunrise] = useState<Date>()
    const [sunset, setSunset] = useState()

    let sunriseInTime: any;
    let sunsetInTime: any;
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


    useEffect(() => {
        console.log(props.location);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${ props.location }&appid=761054a7adf90be0fd31535e2b0cbf31&units=metric`)
            .then(res => {
                console.log(res.data.list);
                setTemp(res.data.list);
            })
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="danger">
                    <IonTitle>5 Day Forecast</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">5 Day Forecast</IonTitle>
                    </IonToolbar>
                </IonHeader> */}
                {/* <ul>{ temp.filter((e, i) => (i % 8) == 0).map((element, index) => <li key={ index }> { element.main.temp } </li>) }</ul>  */ }
                {/* <div>
                    { temp.filter((e, i) => (i % 8) == 0).map((element, index) =>
                        <div className={ `box${ index }` }>
                            { element.main.temp }
                        </div>) }
                </div> */}
                <div className="box1">
                    <span className="temp-forecast">Today</span>
                    <span className="temp-forecast">
                        <p>{ temp[0]?.main.temp }°C</p>
                        <p>{ temp[0]?.weather[0].description }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ temp[0]?.weather[0].icon }.png` } /></span>
                </div>
                <div className="box2">
                    <span className="temp-forecast">Tomorrow</span>
                    <span className="temp-forecast">
                        <p>{ temp[1]?.main.temp }°C</p>
                        <p>{ temp[1]?.weather[0].description }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ temp[1]?.weather[0].icon }.png` } /></span>
                </div>
                <div className="box3">
                    <span className="temp-forecast">{ weekday[(day + 2) > 6 ? (day + 2 - 7) : (day + 2)] }</span>
                    <span className="temp-forecast">
                        <p>{ temp[2]?.main.temp }°C</p>
                        <p>{ temp[2]?.weather[0].description }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ temp[2]?.weather[0].icon }.png` } /></span>
                </div>
                <div className="box4">
                    <span className="temp-forecast">{ weekday[(day + 3) > 6 ? (day + 3 - 7) : (day + 3)] }</span>
                    <span className="temp-forecast">
                        <p>{ temp[3]?.main.temp }°C</p>
                        <p>{ temp[3]?.weather[0].description }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ temp[3]?.weather[0].icon }.png` } /></span>
                </div>
                <div className="box5">
                    <span className="temp-forecast">{ weekday[(day + 4) > 6 ? (day + 4 - 7) : (day + 4)] }</span>
                    <span className="temp-forecast">
                        <p>{ temp[4]?.main.temp }°C</p>
                        <p>{ temp[4]?.weather[0].description }</p>
                    </span>
                    <span className="temp-forecast-img"><img src={ `assets/icon/${ temp[4]?.weather[0].icon }.png` } /></span>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default FiveDay;
