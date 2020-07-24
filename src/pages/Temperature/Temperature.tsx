import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonIcon, IonBackButton, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import './Temperature.css'
import { flower, water, navigateCircle, thermometer } from 'ionicons/icons';

interface IntrinsicElements {
    data: any;
}

const Temperature: React.FC<IntrinsicElements> = (props: IntrinsicElements) => {

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
    }, [props.data])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary" >
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Today</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className={ weather.main }>
                <div className="location ion-padding">{ weather.name }</div>
                <div className="temp">  { weather.temp }°C</div>
                <div className="weather"> <IonIcon icon={ flower } /> { weather.main }</div>
                <div className="weather"> <IonIcon icon={ water } /> { weather.humidity } %</div>
                <div className="weather"> <IonIcon icon={ navigateCircle } /> { weather.wind } m/s</div>
                <div className="weather"> <IonIcon icon={ thermometer } /> { weather.pressure } hpa</div>
            </IonContent>
        </IonPage>
    )
}

export default Temperature
