import React from 'react';
import Home from './Home';
import Footer from './Footer';
import CountryList from './CountryList';
import CountrySingle from './CountrySingle';
import { BrowserRouter, Link, Routes, Route, useParams } from 'react-router-dom';

const RouteWrapper = (props) => {
const params = useParams();

return <CountrySingle params={params}{...props} />
}

const App = () => {
    return (
        <BrowserRouter>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/countries">Countries</Link>
                </li>
                
            </ul>
        </nav>
        

        <Routes>
            <Route index element={<Home />}/>
             <Route path="/countries" element={<CountryList/>}/>
             <Route path="/countries/:name" element={<RouteWrapper />}/>
            
        </Routes>


        <Footer />

        </BrowserRouter>
    );
};

export default App;