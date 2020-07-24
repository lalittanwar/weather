import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Location.css';

const Location: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Location</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Location</IonTitle>
                    </IonToolbar>
                </IonHeader> */}

            </IonContent>
        </IonPage>
    );
};

export default Location;