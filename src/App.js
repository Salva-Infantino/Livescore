import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
//import { fetchLiveMatches } from './GetDatas';
import Matches from './Doc/matches.json';
import Spinner from './Components/Spinner';
import GameView from './Components/GameView';
import Footer from './Components/Footer';
import Title from './Components/Title';

const App = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [gameView, setGameView] = useState();
  
  // const fetchFavorites = async () => {
  //   try {
  //     const matches = await fetchLiveMatches('fixtures?id='+favorites.join('&'));
  //     setMatches(matches);
  //     setLoading(false);
  //     console.log(matches);
  //   } catch (error) {
  //     console.log('Error fetching matches:', error);
  //     setLoading(false);
  //   }
  // };

  const fetchFavorites = async() => {
    try {
      const result = await Matches.response;
      setMatches(result);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching matches:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  const day = date.toLocaleString('default', { weekday: 'short' });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day.charAt(0).toUpperCase() + day.slice(1)} ${dayOfMonth} ${month.charAt(0).toUpperCase() + month.slice(1)} - ${hours}:${minutes}`;
}

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Load favorites from LocalStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Update favorites in LocalStorage every time it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="App container text-center my-3 my-lg-5">
      <Title/>
    {
      gameView ? <GameView 
        match={gameView} 
        formatDate={formatDate} 
        setGameView={setGameView} 
        favorites={favorites} 
        setFavorites={setFavorites} /> :
      <div className='row justify-content-center'>
        {
          matches.map(match => <div className='col-12 col-md-6 col-xl-4 mb-4' key={match.fixture.id}>
            <div className='d-flex flex-column text-center p-3 border border-secondary rounded h-100 favGame'
              onClick={() => setGameView(match)}>
              <div className='d-flex justify-content-between text-secondary mb-3 fz-12'>
                <span>{match.league.name}</span>
                {
                  match.fixture.status.short === 'NS'
                  ? (<span>{formatDate(match.fixture.date)}</span>)
                  : match.fixture.status.short === 'FT'
                  ? (<span>FT</span>)
                  : match.fixture.status.short === 'CANC'
                  ? (<span>CANC.</span>)
                  : (<span><Spinner type='live' />{match.fixture.status.elapsed}'</span>)
                }
              </div>
              <div className='fz-12 d-flex flex-column justify-content-center h-100'>
                <div className='row'>
                  <div className='col-6'>
                    <img src={match.teams.home.logo} alt={match.teams.home.name} />
                  </div>
                  <div className='col-6'>
                    <img src={match.teams.away.logo} alt={match.teams.away.name} />
                  </div>
                </div>
                <div className='row my-3'>
                  <div className='col-6'>
                    <div className='d-flex justify-content-center align-items-center text-uppercase h-100'>{match.teams.home.name}</div>
                  </div>
                  <div className='col-6'>
                    <div className='d-flex justify-content-center align-items-center text-uppercase h-100'>{match.teams.away.name}</div>
                  </div>
                </div>
                {
                  match.fixture.status.short !== 'NS' &&
                  <div className='row'>
                    <div className='col-6'>
                      { match.goals.home !== null && <span className='font-weight-bold fs-1'>{match.goals.home}</span>}
                    </div>
                    <div className='col-6'>
                      { match.goals.away !== null && <span className='font-weight-bold fs-1'>{match.goals.away}</span>}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>)
        }

        <div className='col-12 col-md-6 col-xl-4 mb-4'>
          <a href='/allgames' className='d-flex flex-column justify-content-center align-items-center text-center text-secondary p-3 border border-secondary rounded h-100 favGame'>
            <AiOutlinePlus />
            <span className='mt-3'>MORE GAMES</span>
          </a>
        </div>
      </div>
    }

    <Footer />
    </div>
  );
};

export default App;