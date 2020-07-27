import React, { useState, useEffect } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonChip, IonIcon, IonLoading, IonFabButton, useIonViewWillEnter, IonCardHeader, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { add, archive, ellipsisHorizontal, ellipsisVertical, trash, cloudOffline } from 'ionicons/icons';
import { fetchWeather } from '../../api';
import './City.css';
import { trace } from 'console';

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

    const deleteCity = (city: any) => {
        console.log(city);
        for (let i = 0;i < localStorage.length;i++) {
            if (city.toLocaleLowerCase() == localStorage.getItem(`${ i }`)) {
                localStorage.removeItem(`${ i }`);
                setTemparatureToCity();
                break;
            }
        }
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="primary" >
                    <IonTitle>City List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                { weather.map((weather, index) =>
                    <IonItemSliding key={ index }>
                        <IonItem className={ `city-${ weather?.main }` } onClick={ () => selectCity(weather?.name) }>
                            <div>
                                <h1 className="city-temp">{ weather?.temp }°</h1>
                                <p className="name">{ weather?.name }</p>
                                <span className="type">{ weather?.main }</span>
                            </div>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption color="danger" onClick={ () => deleteCity(weather?.name) }>
                                <IonIcon slot="icon-only" icon={ trash } />
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                ) }

                <IonFabButton color="tertiary" className="fab-button" onClick={ () => history.push('/home') }>
                    <IonIcon icon={ add } /></IonFabButton>


            </IonContent>
        </IonPage>
    )
}

export default City
