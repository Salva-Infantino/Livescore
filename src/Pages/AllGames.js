import React, { useState, useEffect } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { MdSportsSoccer } from 'react-icons/md';
//import { fetchLiveMatches } from './GetDatas';
import Matches from '../Doc/matches.json';
import Leagues from '../Doc/leagues.json';
import Footer from '../Components/Footer';

const AllGames = () => {
  const [matches, setMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  
  // const fetchMatches = async () => {
  //   try {
  //     const matches = await fetchLiveMatches('fixtures?next=50');
  //     setMatches(matches);
  //     setLoading(false);
  //     console.log(matches);
  //   } catch (error) {
  //     console.log('Error fetching matches:', error);
  //     setLoading(false);
  //   }
  // };

  const fetchMatches = async() => {
    try {
      const result = await Matches.response;
      setMatches(result);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching matches:', error);
      setLoading(false);
    }
  };

  const fetchLeagues = async() => {
    try {
      const result = await Leagues.response;
      setLeagues(result);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching leagues:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    fetchLeagues();
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

  const toggleFavorite = (id) => {
    const isFavorite = favorites.includes(id);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((el) => el !== id);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, id];
      setFavorites(updatedFavorites);
    }
  };

  const loadLeague = (league) => {

  }

  return (
    <div className="App container my-5">
      <div className='row'>
        <div className='col-12'>
          <h1 className='mb-5 text-center'>Livescore App</h1>
        </div>
        <div className='col-3'>
          <div className="list-group border border-dark rounded-0 menu">
            <a href='/' className='list-group-item border-0 d-flex align-items-center'>
              <GrPrevious />
              <span>BACK TO MY GAMES</span>
            </a>
            <div onClick={() => loadLeague('live')} className='list-group-item border-0 d-flex align-items-center active' role='button'>
              <MdSportsSoccer />
              <span>Live</span>
            </div>
            {
              leagues.map(league => {
                return (
                  <div className='list-group-item border-0' role='button' key={league.league.id}>

                    {
                      league.league.type === 'Cup' ?
                      <div>
                        <img src={league.league.logo} alt={league.league.name} className='logo' />
                        <span>{league.league.name}</span>
                      </div>
                      : league.league.type === 'League' &&
                      <div>
                        <img src={league.country.flag} alt={league.country.name} className='logo' />
                        <span>{league.league.name}</span>
                      </div>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='col-9'>
          <div className='px-3 border border-dark'>

            <div className='row py-2 league'>
              <div className='col-11'>
                <div>
                  <p className='mb-0 fw-bold'>3rd Place Play-Off</p>
                  <small className='text-secondary'>Nations League</small>
                </div>
              </div>
              <div className='col-1'>
                <div className="d-flex justify-content-center align-items-center text-center h-100">
                  <GrNext />
                </div>
              </div>
            </div>

            {
              matches.map(match => {
                return (<div className='row my-1 py-2 bg-dark game' key={match.fixture.id}>
                <div className='col-1'>
                  <div className="d-flex flex-column justify-content-center align-items-center text-center h-100 text-secondary">
                    <small className='p-1'>{new Date(match.fixture.timestamp).getDay() + ' ' + new Date(match.fixture.timestamp).toLocaleString('default', { month: 'long' }).substring(0, 3)}</small>
                    <small className='p-1'>{new Date(match.fixture.timestamp).getHours() + ':' + new Date(match.fixture.timestamp).getMinutes()}</small>
                  </div>
                </div>
                <div className='col-10'>
                  <div className='d-flex flex-column'>
                    <div className="d-flex justify-content-between my-1">
                      <div>
                        <img src={match.teams.home.logo} alt={match.teams.home.name} className='logo' />
                        <span className='text-secondary'>{match.teams.home.name}</span>
                      </div>
                      <div>2</div>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div>
                        <img src={match.teams.away.logo} alt={match.teams.away.name} className='logo' />
                        <span className='text-secondary'>{match.teams.away.name}</span>
                      </div>
                      <div>2</div>
                    </div>
                  </div>
                </div>
                <div className='col-1'>
                  <div className='d-flex justify-content-center align-items-center h-100'>
                    { favorites.includes(match.fixture.id) ? <AiFillStar onClick={() => toggleFavorite(match.fixture.id)} /> : <AiOutlineStar onClick={() => toggleFavorite(match.fixture.id)} /> }
                  </div>
                </div>
            </div>)
              })
            }
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllGames;