import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Description from '../components/Description';
import Input from '../components/Input';
import Button from '../components/Button';
import {randomNumberGenerator} from '../utils/ProductoMedios';
import Table from '../components/Table';

let messagesMatrix = [];

const consumersCalculus = (totalSimulations, totalHours, cost, sellPrice, staticCost ) => {
    let gananciaPromedio = 0;
    let articulosVendidosProm = 0;

    let matrix = [];
    messagesMatrix = [];
    for(let i = 0; i < totalSimulations; i++) {
        let messages = [];
        let information = [];
 

        let netIncome = 0;
        let totalDayArticles = 0;

        for(let j = 0; j < totalHours; j++) {
            let row = [];

            row.push(j+1);

            let totalArticles = 0;
            let rCli = randomNumberGenerator();
            row.push(rCli);

            let comingCli = Math.round(4 * rCli);
            row.push(comingCli);

            for(let k = 0; k < comingCli; k++) {
                let rProduct = randomNumberGenerator();
                let boughtProducts;
                if(rProduct <= 0.2){
                    boughtProducts = 0;
                } else{
                      if(rProduct <= 0.5){
                            boughtProducts = 1;
                        } else {
                            if(rProduct <= 0.9){
                                boughtProducts = 2;
                            } else {
                                boughtProducts = 3;
                            }
                    }
                }
                totalArticles += boughtProducts;

            }
            
            totalDayArticles += totalArticles;
            row.push(totalArticles);

            information.push(row);
        }
        netIncome = (totalDayArticles * (sellPrice - cost)) - staticCost ;

        console.log(netIncome);

        // information.push(rClieArray);
        // information.push(numClieArray);
        // information.push(totalArticlesArray);

        matrix.push(information);

        messages.push('La ganancia neta promedio es ' + netIncome / totalHours);
        messages.push('La cantidad de articulos vendidos por hora es ' + totalDayArticles / totalHours);
        messagesMatrix.push(messages);

        gananciaPromedio += netIncome;
        articulosVendidosProm += totalDayArticles; ;

    }
    alert('La ganancia neta promedio por dia es ' + gananciaPromedio);
    alert('La cantidad de articulos vendidos por dia es ' + articulosVendidosProm);

    console.log(matrix);
    return matrix;
    

    
}

const Clientes = ({ title }) => {

    const[totalSimulations, setTotalSimulations] = useState(0);
    const[totalHours, setTotalHours] = useState(0);
    const[cost, setCost] = useState(0);
    const[sellPrice, setSellPrice] = useState(0);
    const[staticCost, setStaticCost] = useState(0);

    const[headers, setHeaders] = useState([]);
    const titles = ['Hora', 'r Cliente', 'Número de Clientes', 'Total de Artículos'];

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
                    <Input message={'Costo del artículo'} onChange={event => setCost(event.target.value)} />
                    <Input message={'Costo fijo'} onChange={event => setStaticCost(event.target.value)} />
                   
                    <Input message={'Precio de venta'} onChange={event => setSellPrice(event.target.value)} />
                    
                    <Button text={'Calcular'} onClick={() => {
                        setHeaders(titles);
                        setBody(consumersCalculus(totalSimulations, totalHours, cost, sellPrice, staticCost));
                        setInformation(messagesMatrix);
                    }} />
                </div> 

                <Table headers={headers} bodyTable={body} information={information} />



            </div>
            <Footer />
        </div>
    )
}

export default Clientes