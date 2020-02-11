import React from 'react'
import {Typography, Card } from '@material-ui/core'

export default function ForecastCard(props){
    return (
        <Card elevation={2} style={{width: '25%', display: 'flex', justifyContent: 'center', verticalAlign: 'middle', alignItems: 'center', flexDirection: 'column', backgroundColor: props.color}}>
            <Typography>
                {props.date}
            </Typography>
            <Typography color="textPrimary" style={{fontSize: '1.5vh'}} >
                {props.condition}
            </Typography>
            <Typography color="textPrimary" style={{fontSize: '1.5vh'}} >
                {`${props.maxTemp}°C / ${props.minTemp}°C`}
            </Typography>
        </Card>
    );
}