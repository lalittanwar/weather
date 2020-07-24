import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, IonBackButton, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import './Temperature.css'
import { water, thermometer, navigateCircle, flower } from 'ionicons/icons';
import axios from 'axios';

interface IntrinsicElements {
    data: any;
}

const Temperature: React.FC<IntrinsicElements> = (props: IntrinsicElements) => {
    const [location, setLocation] = useState('')
    const [temp, setTemp] = useState()
    const [main, setMain] = useState()
    const [humidity, setHumidity] = useState()
    const [pressure, setPressure] = useState()
    const [wind, setWind] = useState()
    const [sunrise, setSunrise] = useState<Date>()
    const [sunset, setSunset] = useState()

    let sunriseInTime: any;
    let sunsetInTime: any;

    useEffect(() => {
        console.log('props.location ', props.data);
        setTemp(props.data.temp);

    }, [props.data])

    // useIonViewWillEnter(() => {
    //     console.log('useIonViewWillEnter', props.data);
    //     setTemp(props.data.temp);

    // })

    useIonViewWillLeave(() => {
        setLocation('');
        console.log('useIonViewWillLeave', location);
    })

    /*  const fetchWeatherData = () => {
         axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ props.location }&appid=761054a7adf90be0fd31535e2b0cbf31&units=metric`)
             .then(res => {
                 console.log(res.data.name);
                 setTemp(res.data.main.temp);
                 setHumidity(res.data.main.humidity);
                 setMain(res.data.weather[0].main);
                 setPressure(res.data.main.pressure)
                 setWind(res.data.wind.speed)
                 // this.sunriseInTime = new Date(res.data.sys.sunrise * 1000);
                 // setSunrise(this.sunriseInTime)
                 // this.sunsetInTime = new Date(res.data.sys.sunset * 1000);
                 // setSunset(res.data.sys.sunset)
 
             })
     } */

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="danger" >
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Today</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className={ main }>
                {/* <div className="location ion-padding">{ props.location.toUpperCase() }</div> */ }
                <div >  { temp }°C</div>
                {/* <div className="weather"> <IonIcon icon={ flower } /> { main }</div>
                <div className="weather"> <IonIcon icon={ water } /> { humidity } %</div>
                <div className="weather"> <IonIcon icon={ navigateCircle } /> { wind } m/s</div>
                <div className="weather"> <IonIcon icon={ thermometer } /> { pressure } hpa</div> */}
                {/* <div className="weather"> <IonIcon icon={ thermometer } /> { sunrise }</div> */ }
                {/* <div className="weather"> <IonIcon icon={ thermometer } /> { sunset }</div> */ }
            </IonContent>
        </IonPage>
    )
}

export default Temperature
