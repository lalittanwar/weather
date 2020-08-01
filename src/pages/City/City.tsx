import React, { useState, useEffect, useContext } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonChip, IonIcon, IonLoading, IonFabButton, useIonViewWillEnter, IonCardHeader, IonItemOption, IonButtons, IonBackButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { add, closeCircle } from 'ionicons/icons';
import { fetchWeather } from '../../api';
import './City.css';
import { context } from '../../App';
import { relative } from 'path';

const City = ({ sendLocationtoParent }: any) => {

    let history = useHistory();

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;

    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    let newCities: any = [];

    useIonViewWillEnter(() => {
        setTemparatureToCity();
    }, [])

    useEffect(() => {
        setTemparatureToCity();
    }, [cities.length])

    const setTemparatureToCity = async () => {
        let weather: any[] = [];
        let cities = localStorage.getItem('city');
        if (cities) {
            newCities = cities.split(',');
        }
        for (let i = 0;i < newCities.length;i++) {
            weather[i] = await fetchWeather(newCities[i]);
        }
        setCities(newCities);
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

    const deleteCity = (city: string) => {
        let cities = localStorage.getItem('city');
        if (cities) {
            newCities = cities.split(',');
        }
        let index = newCities.indexOf(city);
        newCities.splice(index, 1);
        localStorage.setItem('city', newCities.toString())
        setCities(newCities);
    }


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
                    <div key={ index } style={ { 'position': 'relative' } }>
                        <IonIcon color="medium" icon={ closeCircle } size="large" className="icon-postion"
                            onClick={ () => deleteCity(weather?.name) } />
                        <IonCard className={ `city-${ weather?.main }` } onClick={ () => selectCity(weather?.name) }>
                            <IonCardHeader style={ { fontSize: '25px', color: 'white' } }>{ parseInt(weather?.temp) }° </IonCardHeader>
                            <IonCardContent >
                                <span className="name">{ weather?.name }</span>
                                <span className="type">{ weather?.main }</span>
                            </IonCardContent >
                        </IonCard>

                    </div>) }
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
