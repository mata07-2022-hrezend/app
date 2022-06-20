import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo_ufba.png';

import './styles.css';

const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="UFBA-MATA07"></img>
                </header>
                <main>
                    <h1>UFBA - MATA07</h1>
                    <p>Aplicações da álgebra linear no contexto da computação.</p>

                    <Link to ="/explorar">
                        <span><FiLogIn></FiLogIn></span>
                        <strong>Comece a explorar</strong>
                    </Link>
                </main>
                <span className='disclaimer'>*Esta é uma aplicação puramente acadêmica e sem fins comerciais.</span>
            </div>
        </div>
    );
}

export default Home;