import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Description from '../components/Description';
import Input from '../components/Input';
import Button from '../components/Button';
import Table from '../components/Table';


import { randomNumberGenerator } from "../utils/ProductoMedios";

let messagesMatrix = [];
const diceCalculus = (totalSimulations, totalGames, gamePrice, homeLost) => {
    messagesMatrix = [];
    let simulationMatrix = []; //
    let homeWinCounter;
    let messages;

    let gananciaPromedio = 0;
    let ganadasCasa = 0;
    let probabilidadCasa = 0;

    for(let i = 0; i < totalSimulations; i++){
        messages = []; 
        homeWinCounter = 0;
        let matrix = [];

        let netIncome = 0;
        let netIncomeAverage = 0;
        let probabilityHomeWins;

        for(let j = 0; j < totalGames; j++){
            let row = [];

            row.push(j+1);
            let rDice1 = randomNumberGenerator();
            row.push(rDice1);

            let rDice2 = randomNumberGenerator();
            row.push(rDice2);


            let dice1 = Math.round(1 + (6 - 1) * rDice1);
            row.push(dice1);

            let dice2 = Math.round(1 + (6 - 1) * rDice2);
            row.push(dice2);


            
            let diceTotal = dice1 + dice2;
            row.push(diceTotal);


            if(diceTotal !== 7){
                homeWinCounter++;
                netIncome += parseInt(gamePrice);

            }
            else{
                netIncome = parseInt(netIncome) - parseInt(gamePrice);

            }

            netIncomeAverage += netIncome;
      
            row.push(netIncome);




            matrix.push(row);

        }


        netIncomeAverage = netIncomeAverage / totalGames;
        probabilityHomeWins = (homeWinCounter) / totalGames;



        simulationMatrix.push(matrix);


        messages.push('La ganancia promedio de la casa es ' + netIncomeAverage.toFixed(3));
        messages.push('El número de veces que gana la casa es ' + homeWinCounter);
        messages.push('La probabilidad de que ganó la casa es de ' + probabilityHomeWins.toFixed(3));

        gananciaPromedio += netIncomeAverage;
        ganadasCasa += homeWinCounter;
        probabilidadCasa += probabilityHomeWins;
        
        messagesMatrix.push(messages);
        
        
    }

    alert('La ganancia promedio de la casa en las simulaciones es de ' + gananciaPromedio / totalSimulations);
    alert('El número de veces que gana la casa en promedio es ' + ganadasCasa / totalSimulations);
    alert('La probabilidad que ganó la casa es de ' + probabilidadCasa / totalSimulations);




    return simulationMatrix;

}




const Dados = ({title}) => {
    
    const[totalSimulations, setTotalSimulations] = useState(0);
    const[totalGames, setTotalGames] = useState(0);
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
            <Description text={"El apostador lanza 2 dados y si saca 7 en la suma de los dos dados gana caso contrario pierde, costo del juego es de 2 Bs. y la perdida de la casa si el jugador gana es de 5 Bs., simule el juego para 10 lanzamientos y determine la ganancia neta de la casa, el numero de juegos que gana la casa, el porcentaje de juegos que gana la casa. Conviene implementar este juego de azar?"} />
            <div className="__input--grid">
                <Input message={'Cantidad de Simulaciones'} onChange={ event => setTotalSimulations(event.target.value)} />
                <Input message={'Cantidad de Juegos'} onChange={ event => setTotalGames(event.target.value)} />
                <Input message={'Costo del Juego'} onChange={ event => setGamePrice(event.target.value)} />
                <Input message={'Pedida de la Casa'} onChange={ event => setHomeLost(event.target.value)} />
                
                <Button text={'Calcular'} onClick={() => {setHeaders(titles);
                                                         setBody(diceCalculus(totalSimulations, totalGames, gamePrice, homeLost))
                                                         setInformation(messagesMatrix);
                                                         }}/>
            </div>

            <Table headers={headers} bodyTable={body} information={information} />



        </div>
        <Footer />
    </div>
  )
}

export default Dados