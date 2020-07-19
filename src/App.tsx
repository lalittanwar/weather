import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Today from './pages/Today';
import FiveDay from './pages/FiveDay';
import Location from './pages/Location';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

interface IntrinsicElements {
    sendLocationtoParent: any;
}

const App: React.FC = () => {

    const [location, setLocation] = useState('')
    const [weatherData, setweatherData] = useState('')

    const handler = (location: any) => {
        setLocation(location)
        console.log('location =>', location);
    }


    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/today" render={ () => <Today sendLocationtoParent={ handler } /> } exact={ true } />
                        <Route path="/5-day" component={ FiveDay } exact={ true } />
                        <Route path="/location" component={ Location } />
                        <Route path="/" render={ () => <Redirect to="/today" /> } exact={ true } />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="today" href="/today">
                            <IonIcon icon={ triangle } />
                            <IonLabel>Today</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="5-day" href="/5-day">
                            <IonIcon icon={ ellipse } />
                            <IonLabel>5 Day Forecast</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="location" href="/location">
                            <IonIcon icon={ square } />
                            <IonLabel>Location</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}
export default App;
