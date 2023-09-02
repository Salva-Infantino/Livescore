import React, { useState, useEffect } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { MdSportsSoccer } from 'react-icons/md';
//import { fetchLiveMatches } from './GetDatas';
import Matches from '../Doc/matches.json';
import Leagues from '../Doc/leagues.json';
import Footer from '../Components/Footer';
import Spinner from '../Components/Spinner';
import GameView from '../Components/GameView';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AllGames = ({formatDate}) => {
  const [matches, setMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [gameView, setGameView] = useState();

  const displayedLeagues = [];
  
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


  // fake ones
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
//fixtures?live=all
  }

  const renderMatch = (match) => {
    if (displayedLeagues.includes(match.league.id)) {
      return (
        <Row className='my-1 py-2 bg-dark game' key={match.fixture.id}>
          <Col xs={1}>
            <div className="d-flex flex-column justify-content-center align-items-center text-center h-100 text-secondary">
              {
                match.fixture.status.short === 'NS'
                ? formatDate('short', match.fixture.date)
                : match.fixture.status.short === 'FT' || match.fixture.status.short === 'CANC'
                ? (<small>{match.fixture.status.short}</small>)
                : (<span className='d-flex justify-content-center align-items-center'><Spinner type='live' />{match.fixture.status.elapsed}'</span>)
              }
            </div>
          </Col>
          <Col xs={10}>
            <div className='d-flex flex-column'>
              <div className="d-flex justify-content-between my-1">
                <div>
                  <Image src={match.teams.home.logo} alt={match.teams.home.name} className='logo' />
                  <span className='text-secondary'>{match.teams.home.name}</span>
                </div>
                <div>{match.fixture.status.short === 'NS' ? null : match.goals.home}</div>
              </div>
              <div className="d-flex justify-content-between my-1">
                <div>
                  <Image src={match.teams.away.logo} alt={match.teams.away.name} className='logo' />
                  <span className='text-secondary'>{match.teams.away.name}</span>
                </div>
                <div>{match.fixture.status.short === 'NS' ? null : match.goals.away}</div>
              </div>
            </div>
          </Col>
          <Col xs={1}>
            <div className='d-flex justify-content-center align-items-center h-100'>
              { favorites.includes(match.fixture.id) ? <AiFillStar onClick={() => toggleFavorite(match.fixture.id)} /> : <AiOutlineStar onClick={() => toggleFavorite(match.fixture.id)} /> }
            </div>
          </Col>
        </Row>
      );
    } else {
      displayedLeagues.push(match.league.id);
      return (
        <div key={match.fixture.id}>
          <div className='d-flex justify-content-between align-items-center py-2 league'>
            <div className='d-flex'>
              <Image src={match.league.flag ? match.league.flag : match.league.logo} alt={match.league.country} className='me-3' />
              <div>
                <p className='mb-0 fw-bold'>{match.league.name}</p>
                <small className='text-secondary'>{match.league.flag ? match.league.name : match.league.round}</small>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center text-center h-100">
              <GrNext />
            </div>
          </div>
          <Row className='my-1 py-2 bg-dark game' onClick={() => setGameView(match)}>
            <Col xs={1}>
              <div className="d-flex flex-column justify-content-center align-items-center text-center h-100 text-secondary">
                {
                  match.fixture.status.short === 'NS'
                  ? formatDate('short', match.fixture.date)
                  : match.fixture.status.short === 'FT' || match.fixture.status.short === 'CANC'
                  ? (<small>{match.fixture.status.short}</small>)
                  : (<span className='d-flex justify-content-center align-items-center'><Spinner type='live' />{match.fixture.status.elapsed}'</span>)
                }
              </div>
            </Col>
            <Col xs={10}>
              <div className='d-flex flex-column'>
                <div className="d-flex justify-content-between my-1">
                  <div>
                    <Image src={match.teams.home.logo} alt={match.teams.home.name} className='logo' />
                    <span className='text-secondary'>{match.teams.home.name}</span>
                  </div>
                  <div>{match.fixture.status.short === 'NS' ? null : match.goals.home}</div>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <div>
                    <Image src={match.teams.away.logo} alt={match.teams.away.name} className='logo' />
                    <span className='text-secondary'>{match.teams.away.name}</span>
                  </div>
                  <div>{match.fixture.status.short === 'NS' ? null : match.goals.away}</div>
                </div>
              </div>
            </Col>
            <Col xs={1}>
              <div className='d-flex justify-content-center align-items-center h-100'>
                { favorites.includes(match.fixture.id) ? <AiFillStar onClick={() => toggleFavorite(match.fixture.id)} /> : <AiOutlineStar onClick={() => toggleFavorite(match.fixture.id)} /> }
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return (
    <Container className="App my-5">
      <Row>
        <Col xs={12}>
          <h1 className='mb-5 text-center'>Livescore App</h1>
        </Col>
        <Col xs={3}>
          <div className="list-group border border-dark rounded-0 menu">
            <a href='/' className='list-group-item border-0 d-flex align-items-center'>
              <GrPrevious />
              <span>BACK TO MY FAVORITES</span>
            </a>
            <div onClick={() => loadLeague('live')} className='list-group-item border-0 d-flex align-items-center active' role='button'>
              <MdSportsSoccer />
              <span>Live</span>
            </div>
            {
              leagues.map(league => {
                return (
                  <div onClick={() => loadLeague(league.league.id)} className='list-group-item border-0' role='button' key={league.league.id}>

                    {
                      league.league.type === 'Cup' ?
                      <div>
                        <Image src={league.league.logo} alt={league.league.name} className='logo' />
                        <span>{league.league.name}</span>
                      </div>
                      : league.league.type === 'League' &&
                      <div>
                        <Image src={league.country.flag} alt={league.country.name} className='logo' />
                        <span>{league.league.name}</span>
                      </div>
                    }
                  </div>
                )
              })
            }
          </div>
        </Col>
        <Col xs={9}>
          <div className='px-3 border border-dark'>
            {
              gameView ? <GameView match={gameView} formatDate={formatDate} setGameView={setGameView} favorites={favorites} setFavorites={setFavorites} /> : matches.map(renderMatch)
            }
          </div>
        </Col>
      </Row>

      <Footer />
    </Container>
  );
};

export default AllGames;