import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Description from '../components/Description';
import Input from '../components/Input';
import Button from '../components/Button';
import Table from '../components/Table';

const Clientes = ({ title }) => {

    const[totalSimulations, setTotalSimulations] = useState(0);
    const[totalHours, setTotalHours] = useState(0);
    const[gamePrice, setGamePrice] = useState(0);
    const[homeLost, setHomeLost] = useState(0);

    const[headers, setHeaders] = useState([]);
    const titles = ['Número de Juego', 'r Dado 1', 'r Dado 2', 'Dado 1', 'Dado 2', 'Suma Dados', 'Ganancia Neta'];

    const[body, setBody] = useState([]);

    const[information, setInformation] = useState([]);




    return (
        <div>
            <Header title={title} />
            <div className="container">
                <Description text={"Las llegadas de los clientes a una tienda, sigue una distribución uniforme: 2 ± 2, por hora y cada cliente compra artículos de acuerdo con la siguiente función de probabilidad: ⧫ Artículos: 0 1 2 3 ⧫ Probabilidad: 0.2 0.3 0.4 0.1 Mediante el desarrollo de un modelo de simulación, determine la ganancia neta del dueño y la cantidad de artículos vendidos de ese día si sus costos por día asciende a 300 Bs y el costo del articulo es igual A 50 Bs y el precio de venta es igual a 75 Bs."} />
                <div className="__input--grid">
                    <Input message={'Cantidad de Simulaciones'} onChange={event => setTotalSimulations(event.target.value)} />
                    <Input message={'Cantidad de horas'} onChange={event => setTotalHours(event.target.value)} />
                    <Input message={'Costo por día'} onChange={event => setGamePrice(event.target.value)} />
                    <Input message={'Costo del artículo'} onChange={event => setHomeLost(event.target.value)} />
                    <Input message={'Precio de venta'} />
                    <Button text={'Calcular'} onClick={() => {
                        // setHeaders(titles);
                        // setBody(diceCalculus(totalSimulations, totalGames, gamePrice, homeLost))
                        // setInformation(messagesMatrix);
                    }} />
                </div> 

                {/* <Table headers={headers} bodyTable={body} information={information} /> */}



            </div>
            <Footer />
        </div>
    )
}

export default Clientes