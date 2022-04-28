import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Description from '../components/Description';
import Input from '../components/Input';
import Button from '../components/Button';
import {randomNumberGenerator} from '../utils/ProductoMedios';
import Table from '../components/Table';

let messagesMatrix = [];

let sugarCalculus = (totalSimulations, totalDays, orderCost, inventory, acquisition, sellPrice, store) => {
    let matrix = [];
    let costoTotalDias = 0;
    let gananciaNetaDias = 0;
    let demandaInsatisfechaDias = 0;

    messagesMatrix = [];
    for(let i = 0; i < totalSimulations; i++) {
        let messagesRow = [];
        let row = [];   
        let rowMatrix = [];
        let totalCost = 0;
        let gananciaNeta = 0;
        let invAzu = store;
        let costoTotalAdq = 0;
        let costoTotalReorden = 0;
        let costoTotalMantenimiento = 0;
        let tent = 0;
        let pAzu = 0;
        let dAzu = 0;
        let ingresoBruto = 0;
        let demandaInsatisfecha = 0;

        for(let j = 0; j < totalDays; j++) {

            row = [];
            row.push(j+1);
            if((j+1) % 7 === 0){
                pAzu = store - invAzu;
                costoTotalAdq += (pAzu * acquisition); 
                costoTotalReorden += parseInt(orderCost);
                let rTent = randomNumberGenerator();
                tent = Math.round(1 + (2 * rTent));
                if(invAzu > 0){
                    costoTotalMantenimiento += (sellPrice * invAzu);
                }
            } else {
                if(tent !== 0) {
                    tent--;
                    if(tent === 0){
                        invAzu += pAzu;
                    }
                }

                let rAzu = randomNumberGenerator();
                rAzu = rAzu === 1 ? 0.999999 : rAzu;
                dAzu = Math.round(-100 * Math.log(1 - rAzu));


                if(invAzu >= dAzu){
                    invAzu -= dAzu;
                    costoTotalMantenimiento += (invAzu * inventory);
                    ingresoBruto += (dAzu * sellPrice);
                } else {
                    demandaInsatisfecha += (dAzu - invAzu);
                    ingresoBruto += (invAzu * sellPrice);
                    invAzu = 0;
                }


            }

            row.push(dAzu);
            row.push(invAzu);
            row.push(costoTotalMantenimiento);
            row.push(ingresoBruto);

            rowMatrix.push(row);
        
        }
        matrix.push(rowMatrix);
        totalCost = costoTotalMantenimiento + costoTotalAdq + costoTotalReorden;
        gananciaNeta = ingresoBruto  - totalCost ;

        messagesRow.push('Costo Total ' + Number(totalCost).toFixed(3));
        messagesRow.push('Ganancia neta ' + Number(gananciaNeta).toFixed(3));
        messagesRow.push('Demanda Insatisfecha ' + demandaInsatisfecha);

        costoTotalDias += totalCost;
        gananciaNetaDias += gananciaNeta;
        demandaInsatisfechaDias += demandaInsatisfecha;

        messagesMatrix.push(messagesRow);

    }

    console.log(costoTotalDias);

    alert('Costo Total promedio ' + Number(costoTotalDias / totalSimulations).toFixed(3));
    alert('Ganancia neta ' + Number(gananciaNetaDias / totalSimulations).toFixed(3));
    alert('Demanda Insatisfecha ' + (demandaInsatisfechaDias / totalSimulations).toFixed(3));


    return matrix;

}

const Azucar = ({title}) => {
    const[totalSimulations, setTotalSimulations] = useState(0);
    const[totalDays, setTotalDays] = useState(0);
    const[orderCost, setOrderCost] = useState(0);
    const[sellPrice, setSellPrice] = useState(0);
    const[inventory, setInventory] = useState(0);
    const[acquisition, setAcquisition] = useState(0);
    const[store, setStore] = useState(0);


    const[staticCost, setStaticCost] = useState(0);

    const[headers, setHeaders] = useState([]);

    const[body, setBody] = useState([]);

    const[information, setInformation] = useState([]);
    const titles = ['Día', 'Demanda Azúcar', 'Inventario Azúcar', 'Costo Total Mantenimiento', 'Ingreso Bruto'];

    return (
        <div>
        <Header title={title} />
        <div className="container">
            <Description text={"La demanda de azúcar en una tienda sigue una distribución exponencial con media de 100 Kg/día. El dueño de la tienda revisa el inventario cada 7 días y hace un pedido a la planta igual a la capacidad de la bodega menos la cantidad de azúcar que tiene disponible en ese momento: la entrega no es inmediata y sigue una distribución uniforme entre 1 y 3 días. La demanda no surtida por falta de existencias representa ventas perdidas. La capacidad de almacenamiento de la bodega es de 700 Kgrs . El costo de ordenar es de 100 Bs./orden. El costo de llevar el inventario es igual a 0.1 Bs./Kg, el costo de adquisición es igual a 3.5 Bs/ Kgr y el precio de venta igual 5 Bs/ Kgr .Determinar el comportamiento del inventario a lo largo del tiempo, el costo y la ganancia neta, la demanda insatisfecha para un horizonte de dos meses. Sera la capacidad del almacén suficiente?"} />
            <div className="__input--grid">
                <Input message={'Cantidad de Simulaciones'} onChange={event => setTotalSimulations(event.target.value)} />
                <Input message={'Cantidad de Días'} onChange={event => setTotalDays(event.target.value)} />
                <Input message={'Costo de Ordenar'} onChange={event => setOrderCost(event.target.value)} />
                <Input message={'Costo de Llevar el Inventario'} onChange={event => setInventory(event.target.value)} />
                <Input message={'Costo de Adquisición'} onChange={event => setAcquisition(event.target.value)} />
                <Input message={'Capacidad Bodéga'} onChange={event => setStore(event.target.value)} />
                               
                <Input message={'Precio de venta'} onChange={event => setSellPrice(event.target.value)} />
                
                <Button text={'Calcular'} onClick={() => {
                    setHeaders(titles);
                    setBody(sugarCalculus(totalSimulations, totalDays, orderCost, inventory, acquisition, sellPrice, store));
                    setInformation(messagesMatrix);
                }} />
            </div> 

            <Table headers={headers} bodyTable={body} information={information} />



        </div>
        <Footer />
    </div>
  )
}

export default Azucar