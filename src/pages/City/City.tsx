import React, { useState, useEffect } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonChip, IonIcon, IonLoading, IonFabButton, useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { add } from 'ionicons/icons';
import { fetchWeather } from '../../api';

const City = ({ sendLocationtoParent }: any) => {

    let history = useHistory();

    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useIonViewWillEnter(() => {
        setTemparatureToCity();
    }, [])

    const setTemparatureToCity = async () => {
        let city: string[] = [];
        let weather = [];
        console.log(city);
        for (let i = 0;i < localStorage.length;i++) {
            city[i] = localStorage.getItem(`${ i }`);
            weather[i] = await fetchWeather(city[i]);
        }
        console.log(city, weather);
        setCities(city);
        setWeather(weather);
    }


    const selectCity = (city: any) => {
        sendLocationtoParent(city);
        setLocation(city);
        history.push('/temperature');
    }


    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="primary" >
                    <IonTitle>City List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <div>{ weather.map((weather, index) =>
                    <IonCard key={ index } onClick={ () => selectCity(weather) }>
                        <IonCardContent  >
                            { weather?.name } { weather?.temp }° { weather?.main }
                        </IonCardContent >
                    </IonCard>) }
                </div>
                <IonFabButton className="fab-button" onClick={ () => history.push('/home') }>
                    <IonIcon icon={ add } /></IonFabButton>
            </IonContent>
        </IonPage>
    )
}

export default City
