import React from 'react'

export default function ForecastContainer(props){    
    return (
        <div className="forecast-container">
            {props.forecastCards}
        </div>
    );
}