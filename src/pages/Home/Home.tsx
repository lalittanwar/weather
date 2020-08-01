import React, { useState, useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonChip, IonIcon, IonLoading, IonBackButton, IonButtons, IonList, IonSearchbar } from '@ionic/react';
import './Home.css';
import { useHistory } from "react-router-dom";
import { context } from '../../App';
import city from '../../api/city.json';

interface IntrinsicElements {
    sendLocationtoParent: any;
}

const Home: React.FC<IntrinsicElements> = ({ sendLocationtoParent }: IntrinsicElements, props) => {

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;

    let history = useHistory();
    const [location, setLocation] = useState('');
    const [filterCity, setfilterCity] = useState([]);
    const [popularCities] = useState(['Delhi', 'Mumbai', 'Chennai', 'kolkata', 'Pune',
        'Jaipur', 'Sydney', 'Tokyo', 'New York', 'London']);

    const selectCity = (city: any) => {
        sendLocationtoParent(city);
        let cities = localStorage.getItem('city');
        let newCities: any = [];
        if (cities) {
            newCities = cities.split(',');
        }
        newCities.push(city);
        localStorage.setItem('city', newCities.toString())
        setLocation('');
        history.push('/temperature');
    }

    const typeCity = (e: any) => {
        const typed = e.detail.value!;
        let length = typed.length;
        if (typed) {
            const filterCity = city.filter((c) => {
                if ((c.name.toLowerCase().slice(0, length)) == (typed.toLowerCase())) {
                    return c;
                }
            })
            setfilterCity(filterCity.slice(0, 10));
        } else {
            setfilterCity([]);
        }
        setLocation(e.detail.value!)
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color={ state ? 'success' : 'primary' }  >
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Search City</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color={ state ? 'light' : 'dark' }>
                <IonSearchbar placeholder="Input the city name"
                    debounce={ 0 } animated={ true } value={ location }
                    onIonChange={ e => typeCity(e) }></IonSearchbar>
                <IonList>
                    { filterCity.map((el, i) => <IonItem key={ i } onClick={ () => selectCity(el.name) }>
                        <IonLabel >{ el.name } <p className="country">{ el.country }</p></IonLabel>
                    </IonItem>) }
                </IonList>
                <div className="ion-padding">
                    <p className={ state ? 'popular-cities-light' : 'popular-cities-dark' }>POPULAR CITIES</p>
                    { popularCities.map((city, index) =>
                        <IonChip color="medium" outline key={ index } onClick={ () => selectCity(city) }>
                            <IonLabel  >
                                { city?.toUpperCase() }
                            </IonLabel >
                        </IonChip>) }
                </div>
            </IonContent>
        </IonPage >

    );
};

export default Home;