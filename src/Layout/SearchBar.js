import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state ={
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        });
    }

    async onSubmit(e){
        if(e) e.preventDefault();
        await this.props.handleSubmission(this.state.value);
        
        await this.setState({
            value: ''
        });
    }

    render(){
        return (
            <Paper elevation={3}>
                <div className="search-bar">
                    <form onSubmit={this.onSubmit}>
                        <input 
                            type="text"
                            onChange={this.handleChange} 
                            placeholder="City Name..." 
                            value={this.state.value} 
                            ref={(element) => { this.input = element }} 
                        />
                    </form>
                </div>
            </Paper>
        );
    }
}