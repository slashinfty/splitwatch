import logo from './logo.svg';
import './Main.css';

const Main = () => {
    return (
        <div className="Main">
            <header className="Main-header">
                <img src={logo} className="Main-logo" alt="logo" />
                <p>
                    Edit <code>src/Views/Main/Main.js</code> and save to reload!
                </p>
                <a className="Main-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default Main;
