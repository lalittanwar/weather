import React, { useState, useEffect } from 'react';
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
import { rainy, home, compass, thermometer } from 'ionicons/icons';


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

/* Components */
import Temperature from './pages/Temperature/Temperature';
import Home from './pages/Home/Home';
import FiveDay from './pages/FiveDay/FiveDay';
import Location from './pages/Location/Location';
import { fetchWeather } from './api'

const App: React.FC = () => {
    const [data, setLocation] = useState(null)

    useEffect(() => {

        // console.log(data);
    }, [])

    const handler = async (location: any) => {
        const data: any = await fetchWeather(location);
        setLocation(data)
        console.log('location =>', location, data);
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/home" render={ () => <Home sendLocationtoParent={ handler } /> } exact={ true } />
                        <Route path="/temperature" render={ () => <Temperature data={ data } /> } exact={ true } />
                        {/* <Route path="/:tab(5-day)" render={ () => <FiveDay data={ data } /> } exact={ true } /> */ }
                        <Route path="/location" component={ Location } />
                        <Route path="/" render={ () => <Redirect to="/home" /> } exact={ true } />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom" color="danger" >
                        <IonTabButton tab="home" href="/home">
                            <IonIcon icon={ home } />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="temperature" href="/temperature">
                            <IonIcon icon={ thermometer } />
                            <IonLabel>Today</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="5-day" href="/5-day">
                            <IonIcon icon={ rainy } />
                            <IonLabel>5 Day Forecast</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="location" href="/location">
                            <IonIcon icon={ compass } />
                            <IonLabel>Location</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}
export default App;