import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Description from '../components/Description';
import Input from '../components/Input';
import Button from '../components/Button';
import Table from '../components/Table';


import { randomNumberGenerator } from "../utils/ProductoMedios";

let messagesMatrix = [];

const chickenCalculus = (totalSimulations, days, chickenPrice, eggPrice) => {
    let matrix = [];
    for(let i = 0; i < totalSimulations; i++) {
        let simulationMatrix = [];
        let messageRow = [];
        let eggSum = 0;
        let aliveChickenSum = 0;

        let ib = 0;
        for(let j = 0; j < days; j++) {
            let row = [];
            row.push(j+1);
            let rEggNumber = randomNumberGenerator();
            row.push(rEggNumber);

            let eggNumber;
            if(rEggNumber <= 0.135){
                eggNumber = 0;
            }
            else if(rEggNumber <= 0.406){
                eggNumber = 1;
            }
            else if(rEggNumber <= 0.672){
                eggNumber = 2;
            }
            else if(rEggNumber <= 0.857){
                eggNumber = 3;
            }
            else if(rEggNumber <= 0.947){
                eggNumber = 4;
            }
            else if(rEggNumber <= 0.983){
                eggNumber = 5;
            }
            else if(rEggNumber <= 0.995){
                eggNumber = 6;
            }
            else if(rEggNumber <= 0.998){
                eggNumber = 7;
            }
            else {
                eggNumber = 8;
            }
            row.push(eggNumber);

            let rEggState = randomNumberGenerator();

            let brokenEgg = 0;
            let deathEgg = 0;
            let aliveEgg = 0;
            let totalEgg = 0;

            for(let h = 0; h < eggNumber; h++){
                if(rEggState <= 0.2){
                    //HUEVO ROTO
                    brokenEgg += 1;
                }
                else if(rEggState <= 0.5){
                    let rChickenState = randomNumberGenerator();
                    if(rChickenState <= 0.2){
                        // POllos muertos +1
                        deathEgg += 1;
                    }
                    else{
                         //Pollos vivos +1
                         aliveEgg += 1;
                    }
                }
                else{
                       //Se quedan como huevos
                    totalEgg += 1;
                }
            }
            row.push(brokenEgg);
            row.push(aliveEgg);
            row.push(deathEgg);
            row.push(totalEgg);

            eggSum += totalEgg;
            aliveChickenSum += aliveEgg;
            


            simulationMatrix.push(row);
            

        }

        ib = parseInt(eggSum * eggPrice) + parseInt(aliveChickenSum * chickenPrice);

        messageRow.push('El ingreso bruto es igual a ' + parseInt(ib) + ' Bs');
        messageRow.push('El ingreso promedio es igual a ' + (parseInt(ib)/parseInt(days)).toFixed(3) + ' Bs/dia');
        messagesMatrix.push(messageRow);

        matrix.push(simulationMatrix);
        console.log('Simulacion');

    }
    
    console.log(matrix);

    return matrix;
}

const Gallina = ({title}) => {

    const[totalSimulations, setTotalSimulations] = useState(0);
    const[days, setDays] = useState(0);
    const[chickenPrice, setChickenPrice] = useState(0);
    const[eggPrice, setEggPrice] = useState(0);


    const[headers, setHeaders] = useState([]);
    const titles = ['Día', 'r Cantidad de Huevos', 'Cantidad de Huevos', 'Huevo Roto', 'Pollos Vivos', 'Pollos Muertos', 'Huevos'];

    const[body, setBody] = useState([]);

    const[information, setInformation] = useState([]);
  return (
    <div>
        <Header title={title} />
        <div className="container">
            <Description text={"Un granjero tiene una gallina que pone huevos a una razón Poisson con media de 2 huevos/dia. El 20% de los huevos se rompen del 30% de ellos nacen pollos y el resto permanecen  como huevos. De los pollos el 20% muere y el 80% sobreviven. Simule este sistema durante 30 dias y determine el ingreso promedio del granjero si cada huevo se vende a 2 $us y . Además determine el número de pollos que muere y que se rompen. "} />
            <div className="__input--grid">
                <Input message={'Cantidad de Simulaciones'} onChange={ event => setTotalSimulations(event.target.value)} />
                <Input message={'Cantidad de Días'} onChange={ event => setDays(event.target.value)} />
                <Input message={'Precio de venta de Pollos'} onChange={ event => setChickenPrice(event.target.value)} />
                <Input message={'Precio de venta del Huevo'} onChange={ event => setEggPrice(event.target.value)} />
                <Button text={'Calcular'} onClick={ () => {

                                                            setHeaders(titles);
                                                            setBody(chickenCalculus(totalSimulations, days, chickenPrice, eggPrice));
                                                            setInformation(messagesMatrix);
                                                          }} />
            </div>

            <Table headers={headers} bodyTable={body} information={information} />



        </div>
        <Footer />
    </div>
  )
}

export default Gallina