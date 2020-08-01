import React,{ useState,useEffect,useReducer } from 'react';
import { Redirect,Route } from 'react-router-dom';
import { IonApp,IonIcon,IonLabel,IonRouterOutlet,IonTabBar,IonTabButton,IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { rainy,thermometer,snow,layers } from 'ionicons/icons';

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
import City from './pages/City/City';
import About from './pages/About/About';
import { fetchWeather,fetchFiveDayForecast } from './api';
import Maps from './pages/Maps/Maps';
import city from './api/city.json';


const themes = true;
export const context = React.createContext( themes );

const { Provider,Consumer } = context;

const reducer = ( state,action ) => {
    switch ( action ) {
        case 'dark':
            return true;
        case 'light':
            return false;
        default:
            return state;
    }
}

const App = () => {
    const [ data,setData ] = useState( null );
    const [ error,setError ] = useState( null );
    const [ fiveDaydata,setFiveDaydata ] = useState( null );
    const [ state,dispatch ] = useReducer( reducer,themes );

    useEffect( () => {
        getDefaultLocation();
    },[] )


    const getDefaultLocation = async () => {
        let location = 'delhi';
        const data = await fetchWeather( location );
        setData( data );
        const fiveDaydata = await fetchFiveDayForecast( location );
        setFiveDaydata( fiveDaydata );
    }


    const handler = async ( location ) => {
        fetchWeather( location ).then( ( data ) => {
            setData( data );
        } ).catch( ( err ) => {
            setError( err );
        } )
        const fiveDaydata = await fetchFiveDayForecast( location );
        setFiveDaydata( fiveDaydata );

    }

    return (

        <Provider value={ { state,dispatch } }>
            <IonApp>
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/home" render={ () => <Home sendLocationtoParent={ handler } /> } exact={ true } />
                            <Route path="/:tab(temperature)" render={ () => <Temperature data={ data } error={ error } /> } exact={ true } />
                            <Route path="/:tab(5-day)" render={ () => <FiveDay data={ fiveDaydata } /> } exact={ true } />
                            <Route path="/location" component={ Location } />
                            <Route path="/about" component={ About } />
                            <Route path="/maps" component={ Maps } />
                            <Route path="/city" render={ () => <City sendLocationtoParent={ handler } /> } exact={ true } />
                            <Route path="/" render={ () => <Redirect to="/temperature" /> } exact={ true } />
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom" color={ state ? 'success' : 'primary' } >
                            <IonTabButton tab="temperature" href="/temperature">
                                <IonIcon icon={ thermometer } />
                                <IonLabel>Today</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="5-day" href="/5-day">
                                <IonIcon icon={ rainy } />
                                <IonLabel>5 Day Forecast</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="location" href="/location">
                                <IonIcon icon={ snow } />
                                <IonLabel>Covid19</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="about" href="/about">
                                <IonIcon icon={ layers } />
                                <IonLabel>More</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        </Provider>

    );
}
export default App;
