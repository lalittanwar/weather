import React, { useEffect, useState, useContext } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonIcon, IonBackButton, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave, IonFabButton, IonLoading } from '@ionic/react'
import './Temperature.css'
import { flower, water, navigateCircle, thermometer, add, list, location, locationOutline, locationSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import { context } from '../../App';
import { Geolocation } from '@capacitor/core';
import { fetchWeatherLatLng } from '../../api';

interface IntrinsicElements {
    data: any;
    error: any
}

const Temperature: React.FC<IntrinsicElements> = (props: IntrinsicElements) => {

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;

    let history = useHistory();
    const [showLoading, setShowLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(
        {
            name: null, temp: null, main: null,
            humidity: null, pressure: null, wind: null
        });

    useEffect(() => {
        setWeather({
            name: props?.data?.name,
            temp: props?.data?.temp,
            main: props?.data?.main,
            humidity: props?.data?.humidity,
            pressure: props?.data?.pressure,
            wind: props?.data?.wind
        })
        setError(props.error);
    }, [props.data, props.error])

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

    useIonViewWillEnter(() => {
        setShowLoading(true);
    })

    const getLocation = () => {
        Geolocation.getCurrentPosition({
            timeout: 30000,
            maximumAge: 0, //was 0
            enableHighAccuracy: false
        }).then((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            fetchWeatherLatLng(lat, lng).then((data) => {
                setWeather({
                    name: data?.name,
                    temp: data?.temp,
                    main: data?.main,
                    humidity: data?.humidity,
                    pressure: data?.pressure,
                    wind: data?.wind
                })
            })
        })
    }

    if (error) {
        return <NotFound />
    } else {

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color={ state ? 'success' : 'primary' }  >
                        <IonButtons slot="start">
                            <IonBackButton />
                        </IonButtons>
                        <IonButtons slot="end" onClick={ () => getLocation() }>
                            <IonIcon size="large" icon={ locationSharp } />
                        </IonButtons>
                        <IonTitle>{ weather.name }</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className={ `${ weather.main }` }>
                    <div className="container">
                        <div className="temp">  { parseInt(weather.temp) > 50 ? parseInt(weather.temp) / 10 : parseInt(weather.temp) }°</div>
                        <div className="weather-padding">
                            <div className="weather"> <IonIcon icon={ flower } /> { weather.main }</div>
                            <div className="weather"> <IonIcon icon={ water } /> { weather.humidity } %</div>
                            <div className="weather"> <IonIcon icon={ navigateCircle } /> { weather.wind } m/s</div>
                            <div className="weather"> <IonIcon icon={ thermometer } /> { weather.pressure } hpa</div>
                        </div>
                    </div>
                    <IonFabButton className="fab-button" onClick={ () => history.push('/city') }>
                        <IonIcon icon={ list } /></IonFabButton>
                    <IonLoading
                        spinner="lines-small"
                        isOpen={ showLoading }
                        onDidDismiss={ () => setShowLoading(false) }
                        message={ 'Please wait...' }
                        duration={ 1000 }
                    />
                </IonContent>
            </IonPage>

        )
    }
}

export default Temperature
