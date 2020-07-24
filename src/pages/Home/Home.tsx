import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonChip, IonIcon } from '@ionic/react';
import './Home.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { searchCircle, searchOutline, thermometer, searchSharp, add } from 'ionicons/icons';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';



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
        history.push('/temperature');
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
        history.push('/temperature');
    }


    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="primary" >
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="ion-padding">
                    <IonItem >
                        <IonLabel position="floating">Location</IonLabel>
                        <IonInput onIonChange={ e => setLocation(e.detail.value!) }></IonInput>
                    </IonItem><br />
                    <IonButton color="danger" size="default" onClick={ search }>   <IonIcon icon={ searchSharp } />Search</IonButton>
                    {/* <Button variant="contained" color="secondary" size="small" startIcon={ <SearchIcon /> } onClick={ search }>Search</Button> */ }
                    {/* <Button variant="contained" color="primary" size="small" startIcon={ <Add /> } onClick={ addCity }>Add</Button> */ }
                    <IonButton color="success" onClick={ addCity }>   <IonIcon icon={ add } />Add</IonButton>
                </div>

                <div>{ cities.map((city, index) =>
                    <IonChip color="tertiary" outline key={ index } onClick={ () => selectCity(city) }>
                        <IonLabel  >
                            { city?.toUpperCase() }
                        </IonLabel >
                    </IonChip>) }
                </div>
            </IonContent>
        </IonPage>

    );
};

export default Home;