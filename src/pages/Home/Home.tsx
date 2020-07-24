import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent } from '@ionic/react';
import './Home.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";


interface IntrinsicElements {
    sendLocationtoParent: any;
}

const Home: React.FC<IntrinsicElements> = ({ sendLocationtoParent }: IntrinsicElements, props) => {

    let history = useHistory();

    const [location, setLocation] = useState('')
    const [cities, setCities] = useState([])
    const [temp, setTemp] = useState(null)
    const [weatherData, setweatherData] = useState('')

    useEffect(() => {
        let city = [];
        for (let i = 0;i < localStorage.length;i++) {
            city[i] = localStorage.getItem(`${ i }`);
        }
        console.log(city);
        setCities(city);
    }, [])

    const search = () => {
        sendLocationtoParent(location);
        // history.push('/temperature');
    }

    const addCity = () => {
        let city = [];
        let i: number = localStorage.length;
        localStorage.setItem(i.toString(), location);
        for (let i = 0;i < localStorage.length;i++) {
            city[i] = localStorage.getItem(`${ i }`);
        }
        setCities(city)
    }

    const selectCity = (city: any) => {
        sendLocationtoParent(city);
        setLocation(city);
        // console.log('city', city);
        // fetchWeatherData(city);
        // history.push('/temperature');
    }

    function fetchWeatherData(city: string) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=761054a7adf90be0fd31535e2b0cbf31&units=metric`)
            .then(res => {
                console.log(res.data.name);
                setTemp(res.data.main.temp);
                // setHumidity(res.data.main.humidity);
                // setMain(res.data.weather[0].main);
                // setPressure(res.data.main.pressure)
                // setWind(res.data.wind.speed)
                // this.sunriseInTime = new Date(res.data.sys.sunrise * 1000);
                // setSunrise(this.sunriseInTime)
                // this.sunsetInTime = new Date(res.data.sys.sunset * 1000);
                // setSunset(res.data.sys.sunset)

            })
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="danger" >
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="ion-padding">
                    <IonItem >
                        <IonLabel position="floating">Location</IonLabel>
                        <IonInput onIonChange={ e => setLocation(e.detail.value!) }></IonInput>
                    </IonItem><br />
                    <IonButton color="danger" onClick={ search }>Search</IonButton>
                    <IonButton color="danger" onClick={ addCity }>Add</IonButton>
                </div>
                {/* <p>temp- { temp }</p> */ }

                <div>{ cities.map((city, index) =>
                    <IonCard color="tertiary" key={ index } onClick={ (event) => selectCity(city) }>
                        <IonCardContent >
                            { city }
                        </IonCardContent>
                    </IonCard>) }
                </div>
            </IonContent>
        </IonPage>

    );
};

export default Home;