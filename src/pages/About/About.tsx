import React, { useState, useEffect, useContext } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle, IonIcon, IonCard, IonCardContent, IonRow, IonCol, IonPopover } from '@ionic/react'
import { context } from '../../App';
import { construct, heart } from 'ionicons/icons';
import '../About/About.css';
import { Plugins } from '@capacitor/core';

const About = () => {

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;
    const [showPopover, setShowPopover] = useState(false);
    const { Share } = Plugins;


    function share() {
        Share.share({
            title: 'Wether forecast and covid-19 tracker app',
            text: 'Wether forecast and covid-19 tracker app',
            url: 'https://betabuild.io/install/3a2c2d2',
            dialogTitle: 'Wether forecast and covid-19 tracker app'
        }).then(data => {
            console.log(data, 'shared');
        })
            .catch(err => {
                console.error(err);
            })
    }

    const toggleTheme = (e: any) => {
        if (state) {
            dispatch('light');
        } else {
            dispatch('dark');
        }
    }

    return (
        <IonPage>
            <IonHeader style={ state ? null : { 'borderBottom': '1px solid gray' } }>
                <IonToolbar color={ state ? 'success' : 'primary' } >
                    <IonTitle>More</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color={ state ? 'light' : 'dark' } style={ { 'textAlign': 'center' } }>
                <IonItem color={ state ? 'light' : 'dark' } style={ { 'borderBottom': '1px solid gray' } }>
                    <IonLabel>Dark Mode</IonLabel>
                    <IonToggle checked={ !state } onIonChange={ e => toggleTheme(e) } />
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonCard className="social-card">
                            <IonCardContent >
                                <a href="https://lalittanwar.github.io/"><i className="fa fa-graduation-cap " style={ {
                                    'fontSize': '35px',
                                    'color': '#072E5C '
                                } }></i></a>
                                <p>Profile</p>
                            </IonCardContent >
                        </IonCard>
                    </IonCol>
                    <IonCol>
                        <IonCard className="social-card">
                            <IonCardContent >
                                <a href="https://www.linkedin.com/in/lalit-tanwar-9a2489129/" ><i className="fa fa-linkedin" style={ {
                                    'fontSize': '35px',
                                    'color': '#0e76a8 '
                                } }></i></a>
                                <p>LinkedIn</p>
                            </IonCardContent >
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonCard className="social-card" >
                            <IonCardContent >
                                <a href="https://github.com/lalittanwar/"><i className="fa fa-github" style={ {
                                    'fontSize': '35px',
                                    'color': '#333 '
                                } }></i></a>
                                <p>Github</p>
                            </IonCardContent >
                        </IonCard>
                    </IonCol>
                    <IonCol>
                        <IonCard className="social-card">
                            <IonCardContent >
                                <a href="tel:9829384111"><i className="fa fa-phone" style={ {
                                    'fontSize': '35px',
                                    'color': '#138C1F '
                                } }></i></a>
                                <p>Contact</p>
                            </IonCardContent >
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonCard className="social-card">
                            <IonCardContent onClick={ share }>
                                <a><i className="fa fa-share-alt" style={ {
                                    'fontSize': '35px',
                                    'color': '#4D0889 '
                                } }></i></a>
                                <p>Share</p>
                            </IonCardContent >
                        </IonCard>
                    </IonCol>
                    <IonCol>
                        <IonCard className="social-card">
                            <IonCardContent onClick={ () => setShowPopover(true) }>
                                <a><i className="fa fa-envelope" style={ {
                                    'fontSize': '35px',
                                    'color': '#ED7607 '
                                } }></i></a>
                                <p>Email</p>
                            </IonCardContent >
                        </IonCard>
                    </IonCol>

                </IonRow>
                <div className="ion-padding"> Made in India with <IonIcon icon={ heart } color="danger" /> </div>

                <IonPopover
                    isOpen={ showPopover }
                    cssClass='my-custom-class'
                    onDidDismiss={ e => setShowPopover(false) }
                >
                    <p style={ { 'textAlign': 'center' } }>lalit.tanwar258@gmail.com</p>
                </IonPopover>
            </IonContent>
        </IonPage >
    )
}

export default About
