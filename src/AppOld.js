import { Component } from 'react';
import React from 'react';
import './App.css';
import axios from 'axios';
import number from 'easy-number-formatter';



class App extends Component {
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

  searchHandler(event) {
    this.setState({
      searchInput: event.target.value
    });
  };


  render () {
    if (this.state.isLoading) {
      return (
        <div className='loader'>
          <div class="lds-dual-ring"></div>
        </div>
      )
    } else {
      return (
        <>
        <input type='text' name='searchInput' onChange={this.searchHandler.bind(this)}/>
        <div className='countries'>
          {this.state.data
            .filter((c) => {
              return c.name
                .toLowerCase()
                .includes(this.state.searchInput.toLocaleLowerCase());
            })
          .map((c) => (
            <div className='country' key={c.name}>
              <div className='title'>
              <h2>{c.name}</h2><h3>{c.capital}</h3>
              </div>
              <img src={c.flags.png} alt={c.name} />
              <div className='cardContent'>
                <p>
                  Language(s): {c.languages.map((lang, i) => (
                    <span key={i}>{lang.name}</span>
                  ))}
                </p>
                <p>
                  Currencies: {c.currencies.map((mon, i) => (
                    <span key={i}>
                      {mon.name} - {mon.symbol}
                    </span>
                  ))}
                </p>
                <p>Population: <span> {number.formatNumber(c.population)} </span></p>
              </div>
            </div>
          ))}
        </div>
        </>
      )
    }
  }
}

export default App;
