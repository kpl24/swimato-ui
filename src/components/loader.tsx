const Loader = ({ message }: { message?: string }) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center my-5">
            <div className="spinner-grow text-secondary-emphasis" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-secondary-emphasis my-2">{message}</div>
        </div>
    );
}

export default Loader;