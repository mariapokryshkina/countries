import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CountryCard from './CountryCard';
import "./loader.css";


class CountryList extends Component {
  state = {
    data: [],
    searchInput: '',
    isLoading: true,
  }

  componentDidMount() {
    axios
      .get('https://restcountries.com/v2/all?fields=name,capital,flags,languages,currencies,population')
      .then((res) => {
        this.setState({data: res.data, isLoading: false});
        console.log(this.state.data);
      });
  }

   searchHandler(e) {
    this.setState({
      searchInput: e.target.value,
    });
    console.log(this.state.searchInput);
  }


  render () {
    if (this.state.isLoading) {
      return (
        <div>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    }
    
    if (!this.state.isLoading) {
      return (
       <div className="countries">
        <input 
        type='text'
        placeholder="Search..." 
        name='search'
         onChange={this.searchHandler.bind(this)}/>

        
        
          {this.state.data
            .filter((c) => {
              return c.name
                .toLowerCase()
                .includes(this.state.searchInput.toLocaleLowerCase());
            })
          .map((country) =>  (
            <CountryCard {...country} key={country.name}/>
          ))}
            
        </div>
      )
    }
  }
  
}

export default CountryList;

  

