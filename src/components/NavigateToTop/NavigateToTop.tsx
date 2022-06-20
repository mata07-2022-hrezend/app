import React, { useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import './styles.css';

const NavigateToTop = () => {

  const [showButton, setShowButton] = useState(false);

  function scrollToTop() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function handleScroll() {
    var scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if ((document.documentElement.scrollTop / scrollTotal ) > 0.80 ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }
  document.addEventListener("scroll", handleScroll);

  return(
    <div id="navigate-to-top" className={ showButton ? '' : 'hidden'}>
      <button onClick={scrollToTop}>
        <MdKeyboardArrowUp size={50}/>
      </button>
    </div>
  );
}

export default NavigateToTop;