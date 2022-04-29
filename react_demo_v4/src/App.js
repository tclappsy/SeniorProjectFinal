import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import Page from './Page';
import Header from './Header';
import axios from 'axios';
import './style.css';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  //tracks which page is on
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);


  //efficent way of calling to api. 
  //makes the call once rather than rerendering everytime if something causes an error
  useEffect(() => {
    setLoading(true);
    let cancel;

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c=> cancel = c)
    }).then(res => {
    setLoading(false);
    setNextPageUrl(res.data.next);
    setPrevPageUrl(res.data.previous);
    setPokemon(res.data.results.map(p => p.name));
    })

    return () => cancel();
  }, [currentPageUrl])

  if(loading) return "LOADING...";

  function nextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function prevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  

  return (
    <div className = "main">
      <Header />
      <div className = "pokemon">
        <PokemonList pokemon = {pokemon} />
        <Page
        nextPage = {nextPageUrl ? nextPage : null}
        prevPage = {prevPageUrl ? prevPage : null}
        />
      </div>
    </div>
  )
}

export default App;