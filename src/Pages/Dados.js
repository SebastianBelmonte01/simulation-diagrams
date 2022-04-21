import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Description from '../components/Description';
import Input from '../components/Input';
import Button from '../components/Button';


import { randomNumberGenerator } from "../utils/ProductoMedios";

const diceCalculus = (totalSimulations, totalGames, gamePrice, homeLost) => {
    const headers = ['Número de Juego', 'r Dado 1', 'r Dado 2', 'Dado 1', 'Dado 2', 'Suma Dados', 'Ganancia Neta'];
    for(let i = 0; i < totalSimulations; i++){
        let matrix = [];

        let gameNumber = [];
        let rDice1Array = [];
        let rDice2Array = [];
        let dice1Array = [];
        let dice2Array = [];
        let sum = [];
        let netIncomeArray = [];




        let netIncome = 0;
        let homeWinCounter = 0;
        let body = document.getElementsByTagName("body")[0];
        let table = document.createElement("table");

        let simule = document.createElement("h4");
        let num = i + 1;
        let textSimule = document.createTextNode("Simulación " + num + ": ");


        simule.appendChild(textSimule);
        table.appendChild(simule);

        for(let j = 0; j < totalGames; j++){
            gameNumber.push(j+1);
            let rDice1 = randomNumberGenerator();
            rDice1Array.push(rDice1);
            let rDice2 = randomNumberGenerator();
            rDice2Array.push(rDice2);

            let dice1 = Math.round(1 + (6 - 1) * rDice1);
            dice1Array.push(dice1);

            let dice2 = Math.round(1 + (6 - 1) * rDice2);
            dice2Array.push(dice2);

            
            let diceTotal = dice1 + dice2;
            sum.push(diceTotal);

            if(diceTotal !== 7){
                netIncome += gamePrice;
                homeWinCounter++;
            }
            else{
                netIncome = netIncome + gamePrice - homeLost;
            }
            netIncomeArray.push(netIncome);


            // let gameNumber = [];
            // let rDice1Array = [];
            // let rDice2Array = [];
            // let dice1Array = [];
            // let dice2Array = [];
            // let sum = [];
            // let netIncomeArray = [];
            matrix.push(gameNumber);
            matrix.push(rDice1Array);
            matrix.push(rDice2Array);
            matrix.push(dice1Array);
            matrix.push(dice2Array);
            matrix.push(sum);
            matrix.push(netIncomeArray);


        }
        
        
        let tblBody = document.createElement("tbody");
        let row;

        for(let h = 0; h < headers.length; h++) {
            row = document.createElement("th");
            let cell = document.createElement("tr");
            let headerText = document.createTextNode(headers[h]);
            cell.appendChild(headerText);
            row.appendChild(cell);
            tblBody.appendChild(row);
        }
        for(let m = 0; m < matrix.length; m++){
            row = document.createElement("tr");
            for(let u = 0; u < totalGames; u++){
                let cell = document.createElement("td");
                let game = document.createTextNode(matrix[m][u]);
                cell.appendChild(game);
                row.appendChild(cell);
    
            }
            tblBody.appendChild(row);

        }


        table.appendChild(tblBody);
        body.appendChild(table);
        table.classList.add("table");
    }

}


const Dados = ({title}) => {
    
    const[totalSimulations, setTotalSimulations] = useState(0);
    const[totalGames, setTotalGames] = useState(0);
    const[gamePrice, setGamePrice] = useState(0);
    const[homeLost, setHomeLost] = useState(0);



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
                
                <Button text={'Calcular'} onClick={() => {diceCalculus(totalSimulations, totalGames, gamePrice, homeLost)}}/>
            </div>


        </div>
        <Footer />
    </div>
  )
}

export default Dados