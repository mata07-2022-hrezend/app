import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosWarning } from 'react-icons/io';
import './styles.css';

const NavigateToInformations = () => {
  return(
    <div id="informations">
      <Link to ="/informations">
        <span><IoIosWarning size={30} color={'#f94c4c'}/></span>
      </Link>
    </div>
  );
}

export default NavigateToInformations;