import React, { useEffect, useState, useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import './Location.css';
import { fetchCovidData, fetchCovidCountries } from './../../api';
import CountUp from 'react-countup';
import { context } from '../../App';
import { Line, Bar } from 'react-chartjs-2';

let countries: any = null;

const Location: React.FC = () => {

    const themeContext: any = useContext(context);
    const { state, dispatch } = themeContext;

    const [country, setCountry] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchData('');
        fetchCountries('');
    }, [])

    const fetchData = async (country: any) => {
        let data = await fetchCovidData(country);
        setData(data);
    }

    const fetchCountries = async (country: any) => {
        countries = await fetchCovidCountries(country);
    }

    const selectCountry = (e: any) => {
        setCountry(e.target.value);
        fetchData(e.target.value);
    }

    if (!data) {
        return <p>Loading.....</p>
    }

    return (
        <IonPage>
            <IonHeader style={ state ? null : { 'borderBottom': '1px solid gray' } }>
                <IonToolbar color={ state ? 'success' : 'primary' }>
                    <IonTitle>Covid-19</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="covid-center" color={ state ? 'light' : 'dark' }>
                <div className="ion-padding">
                    <img src="assets/img/covid.png" />
                </div>
                <IonItem>
                    <IonSelect placeholder="Global" onIonChange={ (e) => selectCountry(e) }>
                        <IonSelectOption defaultValue="global">Global</IonSelectOption>
                        { countries?.countries.map((el: any, i: any) => {
                            return <IonSelectOption key={ i } value={ el.name }>{ el.name }</IonSelectOption>
                        }) }
                    </IonSelect>
                </IonItem>
                <IonCard className="covid-confirmed">
                    <IonCardContent >
                        <p>Infected</p>
                        <CountUp className="covid-value"
                            start={ 0 }
                            end={ data?.confirmed?.value }
                            duration={ 0 }
                        />
                        <p>{ new Date(data?.lastUpdate).toDateString() }</p>
                        <p></p>
                    </IonCardContent >
                </IonCard>

                <IonCard className="covid-recovered">
                    <IonCardContent >
                        <p > Recovered</p>
                        <CountUp className="covid-value"
                            start={ 0 }
                            end={ data?.recovered?.value }
                            duration={ 0 }
                        />
                        <p>{ new Date(data?.lastUpdate).toDateString() }</p>
                    </IonCardContent >
                </IonCard>

                <IonCard className="covid-deaths">
                    <IonCardContent >
                        <p > Deaths</p>
                        <CountUp className="covid-value"
                            start={ 0 }
                            end={ data?.deaths?.value }
                            duration={ 0 }
                        />
                        <p>{ new Date(data?.lastUpdate).toDateString() }</p>
                    </IonCardContent >
                </IonCard>

                <Bar data={ {
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgb(96, 211, 96)', 'rgb(61, 61, 192)', 'rgb(180, 65, 65)'],
                        data: [data?.confirmed?.value, data?.recovered?.value, data?.deaths?.value]
                    }]
                } }
                    options={ {
                        title: {
                            display: true,
                            text: `Selected country is ${ country }`
                        },
                        legend: {
                            display: false,
                            position: 'right'
                        }
                    } }
                />

            </IonContent>
        </IonPage >
    );
};

export default Location;
