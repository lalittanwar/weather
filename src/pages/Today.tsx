import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonRouterOutlet } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Today.css';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router';
import Temperature from './Temperature/Temperature';

interface IntrinsicElements {
    sendLocationtoParent: any;
}

const Today: React.FC<IntrinsicElements> = ({ sendLocationtoParent }: IntrinsicElements) => {

    const [location, setLocation] = useState('')
    const [temp, setTemp] = useState(null)
    const [weatherData, setweatherData] = useState('')

    const search = () => {
        sendLocationtoParent(location);
    }
    return (

        <IonReactRouter>
            <IonRouterOutlet id="main">
                {/* <React.Fragment> */ }
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Today</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <div className="ion-padding">
                            <IonItem >
                                <IonLabel position="floating">Location</IonLabel>
                                <IonInput onIonChange={ e => setLocation(e.detail.value!) }></IonInput>
                            </IonItem><br />
                            <IonButton color="danger" routerLink='/Temperature' onClick={ search }>Search</IonButton>
                        </div>
                    </IonContent>
                </IonPage>
                <Route path="/Temperature" render={ () => <Temperature location={ location } /> } exact />
                {/* </React.Fragment> */ }
            </IonRouterOutlet>
        </IonReactRouter >

    );
};

export default Today;