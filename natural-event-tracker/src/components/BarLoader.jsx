import spinner from './spinner.gif'

const BarLoader = () => {
    return (
        <div className="bar-loader">
            <img src={spinner} alt="Loading" />
            <h1>Generating Graph . . .</h1>
        </div>
    )
}

export default BarLoader