import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonIcon, IonBackButton, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave, IonFabButton, IonLoading } from '@ionic/react'
import './Temperature.css'
import { flower, water, navigateCircle, thermometer, add, list } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';


interface IntrinsicElements {
    data: any;
}

const Temperature: React.FC<IntrinsicElements> = (props: IntrinsicElements) => {

    let history = useHistory();
    const [showLoading, setShowLoading] = useState(true);
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

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

    useIonViewWillEnter(() => {
        setShowLoading(true);
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary" >
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{ weather.name }</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className={ `${ weather.main }` }>
                <div className="container">
                    <div className="temp">  { weather.temp }°</div>
                    <div>
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

export default Temperature
