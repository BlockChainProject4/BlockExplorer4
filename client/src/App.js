import Index from './pages';
import './App.css';
import Main from './pages/Main.js'
import Header from './component/Global/Header.js';
import Footer from './component/Global/Footer.js';
import UserTradList from './component/CoinList/UserTradList'


function App() {
    return (
        <div className='container'>
            <div>
                <Header/>
            </div>
            <div>
                <Main />
                <UserTradList/>
                <Index />

            </div>
            <div>
                <Footer />
            </div>

        </div>

    );
}

export default App;