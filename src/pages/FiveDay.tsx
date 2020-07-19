import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './FiveDay.css';

const FiveDay: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>5 Day Forecast</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">5 Day Forecast</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer name="Tab 2 page" />
            </IonContent>
        </IonPage>
    );
};

export default FiveDay;
