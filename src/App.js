import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { fetchLiveMatches } from './GetDatas';
// import Matches from './Doc/matches.json';
import Spinner from './Components/Spinner';
import GameView from './Components/GameView';
import Footer from './Components/Footer';
import Title from './Components/Title';
import { Container, Row, Col, Image } from 'react-bootstrap';

const App = ({formatDate}) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [gameView, setGameView] = useState();
  
  const fetchFavorites = async () => {
    try {
      const matches = await fetchLiveMatches('fixtures?ids='+favorites.join('-'));
      // const matches = await fetchLiveMatches('fixtures?ids=648670-588250');
      // const matches = await fetchLiveMatches('fixtures?id=648670');
      // console.log('fav => ' + favorites);
      // const matches = await fetchLiveMatches('https://api-football-v1.p.rapidapi.com/v3/fixtures?id=648670');
      setMatches(matches);
      setLoading(false);
      console.log(matches);
    } catch (error) {
      console.log('Error fetching matches:', error);
      setLoading(false);
    }
  };

  // const fetchFavorites = async() => {
  //   try {
  //     const result = await Matches.response;
  //     setMatches(result);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log('Error fetching matches:', error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  // Load favorites from LocalStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [setFavorites]);

  // Update favorites in LocalStorage every time it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Container className="App text-center my-3 my-lg-5">
      <Title/>
    {
      loading ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div> :
      gameView ? <GameView 
        match={gameView} 
        formatDate={formatDate} 
        setGameView={setGameView} 
        favorites={favorites} 
        setFavorites={setFavorites} /> :
      <Row className='justify-content-center'>
        {
          matches.map(match => <Col xs={12} md={6} xl={4} className='mb-4' key={match.fixture.id}>
            <div className='d-flex flex-column text-center p-3 border border-secondary rounded h-100 favGame'
              onClick={() => setGameView(match)}>
              <div className='d-flex justify-content-between text-secondary mb-3 fz-12'>
                <span>{match.league.name}</span>
                {
                  match.fixture.status.short === 'NS'
                  ? (<span>{formatDate('long', match.fixture.date)}</span>)
                  : match.fixture.status.short === 'FT' || match.fixture.status.short === 'CANC'
                  ? (<span>{match.fixture.status.short}</span>)
                  : (<span className='d-flex justify-content-center align-items-center'>
                    {/* <Spinner type='live' /> */}
                    LOADING...
                    {match.fixture.status.elapsed}'</span>)
                }
              </div>
              <div className='fz-12 d-flex flex-column justify-content-center h-100'>
                <Row>
                  <Col xs={6}>
                    <Image src={match.teams.home.logo} alt={match.teams.home.name} />
                  </Col>
                  <Col xs={6}>
                    <Image src={match.teams.away.logo} alt={match.teams.away.name} />
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col xs={6}>
                    <div className='d-flex justify-content-center align-items-center text-uppercase h-100'>{match.teams.home.name}</div>
                  </Col>
                  <Col xs={6}>
                    <div className='d-flex justify-content-center align-items-center text-uppercase h-100'>{match.teams.away.name}</div>
                  </Col>
                </Row>
                {
                  match.fixture.status.short !== 'NS' &&
                  <Row>
                    <Col xs={6}>
                      { match.goals.home !== null && <span className='font-weight-bold fs-1'>{match.goals.home}</span>}
                    </Col>
                    <Col xs={6}>
                      { match.goals.away !== null && <span className='font-weight-bold fs-1'>{match.goals.away}</span>}
                    </Col>
                  </Row>
                }
              </div>
            </div>
          </Col>)
        }

        <Col xs={12} md={6} xl={4} className='mb-4'>
          <a href='/allgames' className='d-flex flex-column justify-content-center align-items-center text-center text-secondary p-3 border border-secondary rounded h-100 favGame'>
            <AiOutlinePlus />
            <span className='mt-3'>MORE GAMES</span>
          </a>
        </Col>
      </Row>
    }

    <Footer />
    </Container>
  );
};

export default App;