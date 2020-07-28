import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonChip, IonIcon, IonLoading, IonBackButton, IonButtons } from '@ionic/react';
import './Home.css';
import { useHistory } from "react-router-dom";
import { searchSharp, add, locationSharp } from 'ionicons/icons';



interface IntrinsicElements {
    sendLocationtoParent: any;
}

const Home: React.FC<IntrinsicElements> = ({ sendLocationtoParent }: IntrinsicElements, props) => {

    let history = useHistory();
    const [location, setLocation] = useState('');
    const [popularCities] = useState(['Delhi', 'Mumbai', 'Chennai', 'kolkata']);

    const search = () => {
        sendLocationtoParent(location);
        history.push('/temperature');
        setLocation('');
    }


    const addCity = () => {
        let city = [];
        let i: number = localStorage.length;
        localStorage.setItem(i.toString(), location);
        history.push('/city');
        setLocation('');
    }

    const selectCity = (city: any) => {
        sendLocationtoParent(city);
        history.push('/temperature');
    }


    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="primary" >
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Search City</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="ion-padding">
                    <IonItem >
                        <IonLabel position="floating">Input the city name</IonLabel>
                        <IonInput value={ location } onIonChange={ e => setLocation(e.detail.value!) }></IonInput>
                    </IonItem><br />
                    <div className="center" >
                        <IonButton className="ion=padding" color="tertiary" size="small" onClick={ search }>   <IonIcon icon={ searchSharp } />Search</IonButton>
                        <IonButton color="danger" size="small" onClick={ addCity }>   <IonIcon icon={ add } />Add</IonButton>
                        <IonButton color="secondary" size="small" onClick={ () => history.push('/location') }>   <IonIcon icon={ locationSharp } />Location</IonButton>
                    </div>
                </div>

                <div className="ion-padding">
                    <p className="popular-cities">POPULAR CITIES</p>
                    { popularCities.map((city, index) =>
                        <IonChip color="medium" outline key={ index } onClick={ () => selectCity(city) }>
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