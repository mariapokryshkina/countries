import React, { Component } from 'react';
import axios from 'axios';



function getCountry(capital) {
  return axios.get(`https://restcountries.com/v2/capital/${capital}`);
}

function getWeather(capital) {
  return axios.get('http://api.weatherstack.com ',{
      params:{
      access_key: process.env.REACT_APP_API_KEY,
      query: capital,
  },
});
}

class countrySingle extends Component {

    state = {
        country: [],
        weather: [],
    };

    componentDidMount() {
        Promise.all([
            getCountry(this.props.params.name), 
            getWeather(this.props.params.name),
        ]).then(res => {
            this.setState({country: res[0].data, weather:res[1].data });
            console.log("country", this.state.country);
            console.log("weather", this.state.weather);

        });
    }

    render() {
        return (
            <div>{this.props.params.name}
            </div>
        );
    }
}

export default countrySingle;