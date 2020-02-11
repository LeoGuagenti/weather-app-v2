/**
 * @author Leo Guagenti
 * @date   2/4/20
 * 
 * 
 * this file is to hold the project together and style
*/

import React from 'react';
import WeatherApp from './Layout/WeatherApp'

import './Styles/style.css'

export default function App(){
    return (
        <div className="app">
            <WeatherApp />
        </div>
    );
}
