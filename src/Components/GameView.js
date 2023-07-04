import { GrPrevious } from 'react-icons/gr';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { MdSportsSoccer } from 'react-icons/md';
import Spinner from './Spinner';

const GameView = ({match, formatDate, setGameView, favorites, setFavorites}) => {

    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter((el) => el !== id);
        setFavorites(updatedFavorites);
    };

    return (
        <div className='col-12 mb-5'>
            <div className='d-flex justify-content-between topNav mb-3 mb-lg-5'>
                <span className='d-flex align-items-center' role="button" onClick={() => setGameView()}><GrPrevious className='me-2' />Back</span>
                {/* <AiFillStar onClick={() => removeFavorite(match.fixture.id)} className='fav' role='button' /> */}
            </div>

            <div className='d-flex flex-column text-center p-3 border border-secondary rounded h-100 GameView'>
              <div className='d-flex justify-content-between text-secondary mb-3 fz-12'>
                <span>{match.league.name}</span>
                {match.fixture.status.short === 'NS'
                ? (<span>{formatDate(match.fixture.date)}</span>)
                : match.fixture.status.short === 'FT'
                ? (<span>FT</span>)
                : match.fixture.status.short === 'CANC'
                ? (<span>CANC.</span>)
                : (<span><Spinner type='live' />{match.fixture.status.elapsed}'</span>)}
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
                {match.fixture.status.short !== 'NS' &&
                <div className='row'>
                  <div className='col-6'>
                      { match.goals.home !== null && <span className='font-weight-bold fs-1'>{match.goals.home}</span>}
                  </div>
                  <div className='col-6'>
                      { match.goals.away !== null && <span className='font-weight-bold fs-1'>{match.goals.away}</span>}
                  </div>
                </div>}
                {match.events?.length > 0 && <div className='row justify-content-center my-4 my-md-5'>
                  <div className='col-6 col-md-5 col-lg-4'>
                      {match.events.map((event, i) => event.team.id === match.teams.home.id &&
                      <div className='d-flex my-1' key={i}>
                          <span className='d-flex align-items-center me-2'>
                              {event.type === 'Goal' ? 
                              <MdSportsSoccer /> : 
                              event.detail === 'Yellow Card' ? 
                              <span className='card yellow'></span> : 
                              event.detail === 'Red Card' && <span className='card red'></span>}
                          </span>
                          <span className='me-2'>{event.time.elapsed}'</span>
                          <span>{event.player.name} {event.detail === 'Penalty' && '(P)'}</span>
                      </div>)}
                  </div>
                  <div className='col-6 col-md-5 col-lg-4'>
                      {match.events.map((event, i) => event.team.id === match.teams.away.id &&
                      <div className='d-flex justify-content-end my-1' key={i}>
                          <span>{event.player.name} {event.detail === 'Penalty' && '(P)'}</span>
                          <span className='ms-2'>{event.time.elapsed}'</span>
                          <span className='d-flex align-items-center ms-2'>
                              {event.type === 'Goal' ? 
                              <MdSportsSoccer /> : 
                              event.detail === 'Yellow Card' ? 
                              <span className='card yellow'></span> : 
                              event.detail === 'Red Card' && <span className='card red'></span>}
                          </span>
                      </div>)}
                  </div>
                </div>}
                <div className='col-12 text-center text-secondary'>
                    <small>{match.fixture.venue.city}<br/>{match.fixture.venue.name}</small>
                </div>
              </div>
            </div>
        </div>
    )
}

export default GameView;