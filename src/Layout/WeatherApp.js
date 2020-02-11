import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

import SearchBar from './SearchBar'
import CityDisplay from './Screen/CityDisplay'
import Forecast from './Forecast/forecastContainer'
import ForecastCard from './Forecast/forecastCard'

const api_key = '9456a00cc6bade612997961f941fc568';

export default class WeatherApp extends Component{
    constructor(props){
        super(props);

        this.state = {
            city: undefined,
            //region: undefined,

            currentData: undefined,
            forecastData: undefined
        };

        this.handleSubmission = this.handleSubmission.bind(this);
        this.getWeatherData = this.getWeatherData.bind(this);
    }

    UNSAFE_componentWillMount(){
        this.setState({
            city: "Cincinnati" //default city
        }, function(){
            this.getWeatherData();
        });        
    }

    handleSubmission(cityValue){
        this.setState({
            city: cityValue
        }, function(){
            this.getWeatherData();
        });
    }   

    async getWeatherData(){
        var apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},us&appid=${api_key}&units=metric`);
        var currentData = await apiCall.json();

        apiCall = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},us&appid=${api_key}&units=metric`);
        var rawForecastData = await apiCall.json();

        console.log(currentData);

        if(currentData.cod == "404"){
            console.log('invalid input');
        }else{
            var forecastData = this.parseForecastData(rawForecastData);

            this.setState({
                currentData: currentData,
                forecastData: forecastData
            });
        }
        
    }

    parseForecastData(data){
        //maybe refactor sometime
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        var mins = [];
        var maxs = [];
        var descs = [];
        var weatherCards = [];
        var d = new Date();
        var day;

        var min = data.list[0].main.temp_min;
        var max = data.list[0].main.temp_max;
        var desc = data.list[0].weather[0].description;

        for(var i = 0; i < data.list.length; i++){
            if((i + 1) % 8 === 0){
                mins.push(min);
                maxs.push(max);
                descs.push(desc);
                min = data.list[i].main.temp_min;
                max = data.list[i].main.temp_max; 
                desc = data.list[i].weather[0].description;
            }else{
                if(data.list[i].main.temp_max > max){
                    max = data.list[i].main.temp_max;
                }
                if(data.list[i].main.temp_min < min){
                    min = data.list[i].main.temp_min;
                }
            }
        }

        for(var i = 0; i < 4; i++){
            if(d.getDay() + 1 > days.length){
                day = days[0];
            }else{
                day = days[d.getDay() + (i + 1)];
            }

            weatherCards.push(
                <ForecastCard 
                    key={"card_"+i} 
                    maxTemp={maxs[i]}
                    minTemp={mins[i]} 
                    condition={descs[i].charAt(0).toUpperCase() + descs[i].slice(1)}
                    date={day}
                />
            );
        }
        return weatherCards;
    }

    render(){
        return (
            <Paper elevation={5}>
                <div className="weather-app">
                    <SearchBar 
                        handleSubmission={this.handleSubmission} 
                    />
                    <CityDisplay 
                        currentData={this.state.currentData} 
                    />
                    <Forecast 
                        forecastCards={this.state.forecastData} 
                    />
                </div>
            </Paper>
        );
    }   
}