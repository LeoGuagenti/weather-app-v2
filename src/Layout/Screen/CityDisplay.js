import React from 'react'
import { Container, Typography } from '@material-ui/core'

export default function CityDisplay(props){
    if(props.currentData){
        var city = props.currentData.name;
        var conditions = props.currentData.weather[0].description;
        var currentTemp = props.currentData.main.temp;
        var windSpeed = props.currentData.wind.speed;
        var feelsLike = props.currentData.main.feels_like;
        var maxTemp = props.currentData.main.temp_max;
        var minTemp = props.currentData.main.temp_min;
        var humidity = props.currentData.main.humidity;

        return (
            <Container>
                <br/>   
                <Typography variant="h5" style={{height: 'auto'}}>
                    {city}
                </Typography>
                <Typography color="textSecondary" style={{height: 'auto'}}>
                    {conditions.charAt(0).toUpperCase() + conditions.slice(1)}
                </Typography>
                <div className="weather-info">
                    <div id="left-side-info">
                        <Typography>
                            {`Current: ${currentTemp} °C`}                            
                            <br/>
                            {`Max: ${maxTemp} °C`}
                            <br/>
                            {`Min: ${minTemp} °C`}
                        </Typography>
                    </div>
                    <div id="right-side-info">
                        <Typography>
                            {`Feels like: ${feelsLike} °C`}
                            <br/>
                            {`Humidity: ${humidity}%`}
                            <br/>
                            {`Wind: ${windSpeed}m/s`}
                        </Typography>
                    </div>
                </div>
                <Typography style={{height: '10px'}} />
            </Container>
        );
    }else{
        return (
            <Container style={{height: '210px'}}>
                No content to display.
            </Container>
        );
    }
    

    
}
