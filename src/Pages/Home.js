import React from 'react';
import Header from '../components/Header';
import Grid from '../components/Grid';
import Footer from '../components/Footer';
import '../Styles/home.css';
import { useNavigate } from "react-router-dom";


const Home = ({title}) => {
    
    const navigate = useNavigate();

    const openDices = () => {
        navigate('/dados');
    }   
    
    const openPeople = () => {
        navigate('/people');
    } 

    const openChicken = () => {
        navigate('/gallina');
    }

    const openSugar = () => {
        navigate('/azucar');
    }

  return (
    <div>
        <Header title={title} />
        <div className="home__grid">
            <div className="home__grid-container">
                <Grid title={'a) Lanzamiento de Dados'} 
                    src='/img/Grid/dados.jpg'
                    buttonText = 'Abrir'
                    onClick={openDices}/>
            </div>

            <div className="home__grid-container">
                <Grid title={'b) Problema de Llegada de Clientes'} 
                    src='/img/Grid/clientes.jpg'
                    buttonText = 'Abrir'
                    onClick={openPeople}/>
            </div>

            <div className="home__grid-container">
                <Grid title={'c) Problema de la Gallina Ponedora de Huevos'} 
                    src='/img/Grid/gallina.jpg'
                    buttonText = 'Abrir'
                    onClick={openChicken}/>
            </div>

            <div className="home__grid-container">
                <Grid title={'d) Problema de la Agencia de Azúcar'} 
                    src='/img/Grid/azucar.jpg'
                    buttonText = 'Abrir'
                    onClick={openSugar}/>
            </div>
            
        </div>
        <Footer />
    </div>
  )
}

export default Home