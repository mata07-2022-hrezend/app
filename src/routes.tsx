import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Explore from './pages/Explore';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact></Route>
            <Route component={Explore} path="/explorar" exact></Route>
        </BrowserRouter>
    );
}

export default Routes;