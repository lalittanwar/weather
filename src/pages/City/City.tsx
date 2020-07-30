import React, { useState, useEffect, useContext } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonChip, IonIcon, IonLoading, IonFabButton, useIonViewWillEnter, IonCardHeader, IonItemOption, IonButtons, IonBackButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { add } from 'ionicons/icons';
import { fetchWeather } from '../../api';
import './City.css';
import { context } from '../../App';

const City = ({ sendLocationtoParent }: any) => {

    let history = useHistory();

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;

    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useIonViewWillEnter(() => {
        setTemparatureToCity();
    }, [])

    const setTemparatureToCity = async () => {
        let city: string[] = [];
        let weather: any[] = [];
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

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);


    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color={ state ? 'success' : 'primary' } >
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle> City List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color={ state ? 'light' : 'dark' }>
                { weather.map((weather, index) =>
                    <IonCard className={ `city-${ weather?.main }` } key={ index } onClick={ () => selectCity(weather?.name) }>
                        <IonCardHeader style={ { fontSize: '25px', color: 'white' } }>{ parseInt(weather?.temp) }° </IonCardHeader>
                        <IonCardContent >
                            <span className="name">{ weather?.name }</span>
                            <span className="type">{ weather?.main }</span>
                        </IonCardContent >
                    </IonCard>) }
                <IonFabButton color="tertiary" className="fab-button" onClick={ () => history.push('/home') }>
                    <IonIcon icon={ add } /></IonFabButton>
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

export default City
