import React, { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import './styles.css';
import logo from '../../assets/logo_ufba.png';
import { alternativeDistance, haversineDistance } from '../../utils/Calculator';
import NavigateToTop from '../../components/NavigateToTop/NavigateToTop';

const Explore = () => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [showResults, setShowResults] = useState(false);
    const [resultAlternative, setResultAlternative] = useState('');
    const [resultHaversine, setResultHaversine] = useState('');

    //Pegar geolocalizacao do usuario para abrir o Mapa
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([
                latitude,
                longitude
            ]);
        })
    }, []);

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ]);
        setShowResults(false);
    }

    function handleFormSubmit(event: FormEvent){
        event.preventDefault();

        if(selectedPosition[0] === 0 || selectedPosition[1] === 0) {
            alert('Você deve selecionar o segundo ponto no mapa para poder calcular a distância entre os dois.');
        }
        else {
            setResultAlternative(alternativeDistance(initialPosition, selectedPosition).toFixed(2) + ' km');
            setResultHaversine(haversineDistance(initialPosition, selectedPosition).toFixed(2) + ' km');
            setShowResults(true);
        }
    }

    return(
        <div id="page-explore">
            <header>
                <img src={logo} alt="UFBA-MATA07"></img>
                <Link to="/">
                    <FiArrowLeft></FiArrowLeft>
                    Home
                </Link>
            </header>
            <form onSubmit={handleFormSubmit}>
                <h1>Explorar</h1>

                <fieldset>
                    <legend>
                        <h2>Mapa</h2>
                        <span>Selecione um ponto no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={initialPosition} bubblingMouseEvents={false} />
                        <Marker position={selectedPosition} />
                    </Map>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="latitudePontoUm">Latitude - Sua Localização</label>
                            <input
                                readOnly
                                type="text"
                                name="latitudePontoUm"
                                id="latitudePontoUm"
                                value={initialPosition[0] !== 0 ? initialPosition[0] : ''}
                            ></input>
                        </div>
                        <div className="field">
                            <label htmlFor="longitudePontoUm">Longitude - Sua Localização</label>
                            <input
                                readOnly
                                type="text"
                                name="longitudePontoUm"
                                id="longitudePontoUm"
                                value={initialPosition[1] !== 0 ? initialPosition[1] : ''}
                            ></input>
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="latitudePontoDois">Latitude - Ponto Destino</label>
                            <input
                                readOnly
                                type="text"
                                name="latitudePontoDois"
                                id="latitudePontoDois"
                                value={selectedPosition[0] !== 0 ? selectedPosition[0] : ''}
                            ></input>
                        </div>
                        <div className="field">
                            <label htmlFor="longitudePontoDois">Longitude - Ponto Destino</label>
                            <input
                                readOnly
                                type="text"
                                name="longitudePontoDois"
                                id="longitudePontoDois"
                                value={selectedPosition[1] !== 0 ? selectedPosition[1] : ''}
                            ></input>
                        </div>
                    </div>
                </fieldset>

                <fieldset className={showResults ? '' : 'hidden'}>
                    <legend>
                        <h2>Resultados</h2>
                    </legend>
                    <div className='field'>
                        <label htmlFor="resultHaversine">Haversine</label>
                        <input
                            readOnly
                            type="text"
                            name="resultHaversine"
                            id="resultHaversine"
                            value={resultHaversine}
                        ></input>
                    </div>
                    <div className='field'>
                        <label htmlFor="resultAlternative">Alternative</label>
                        <input
                            readOnly
                            type="text"
                            name="resultAlternative"
                            id="resultAlternative"
                            value={resultAlternative}
                        ></input>
                    </div>
                </fieldset>

                <button type="submit">Calcular Distância</button>
            </form>
            <NavigateToTop></NavigateToTop>
        </div>
    );
}

export default Explore;