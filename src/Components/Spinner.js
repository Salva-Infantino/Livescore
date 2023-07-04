const Spinner = ({type}) => {
    return (
        <div className={type === 'loading' ? 'spinner-border' : type === 'live' && 'spinner-grow text-success spinner-grow-sm me-2'} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;