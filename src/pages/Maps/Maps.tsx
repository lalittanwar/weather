import React, { useContext, useEffect, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonBackButton, IonContent } from '@ionic/react'
import { context } from '../../App';
import { Geolocation } from '@capacitor/core';
import { fetchWeatherLatLng } from '../../api';

const Maps = () => {

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;

    const [latitude, setLat] = useState(0)
    const [longitude, setLong] = useState(0)
    const [weather, setWeather] = useState(
        {
            name: null
        });

    useEffect(() => {
        getLocation();

    }, [])

    const getLocation = () => {
        Geolocation.getCurrentPosition().then((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            fetchWeatherLatLng(lat, lng).then((data) => {
                setWeather({ name: data.name });
            })
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={ state ? 'success' : 'primary' }  >
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>

                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                { latitude }-{ longitude }
                { weather.name }
            </IonContent>
        </IonPage>
    )
}

export default Maps
