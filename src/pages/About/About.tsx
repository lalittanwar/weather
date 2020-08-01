import React, { useState, useEffect, useContext } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle } from '@ionic/react'
import { context } from '../../App';

const About = () => {

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;

    const toggleTheme = (e: any) => {
        if (state) {
            dispatch('light');
        } else {
            dispatch('dark');
        }
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color={ state ? 'success' : 'primary' } >
                    <IonTitle>More</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color={ state ? 'light' : 'dark' }>
                <IonItem>
                    <IonLabel>Theme</IonLabel>
                    <IonToggle checked={ state } onIonChange={ e => toggleTheme(e) } />
                </IonItem>
            </IonContent>
        </IonPage>
    )
}

export default About
