import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton } from '@ionic/react'
import './NotFound.css';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    let history = useHistory();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary" >
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>City Not Found</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="not-found-content">
                <img src="assets/img/noData.png" />
                <p>Please select valid city</p>
                <IonButton className="ion-padding" color="tertiary" size="small" onClick={ () => history.push('/home') }>Back</IonButton>
            </IonContent>
        </IonPage>
    )
}


export default NotFound
