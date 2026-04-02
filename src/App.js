import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./static/images/logo-home.jpg";
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <div className="App">


        <nav className="navbar mb-3" style={{ backgroundColor: '#4e5d70', padding: '10px' }}>
          <div className="d-flex align-items-center">
            <img src={logo} alt="logo" className="app-logo me-2" />
             <span className="text-white fw-bold">CHRISTIAN HUB</span>
            </div>

          <div className="d-flex flex-row">
            <Link to="/" className="btn btn-primary btn-sm me-2">Home</Link>
            <Link to="/signup" className="btn btn-warning btn-sm me-2">Register</Link>
            <Link to="/signin" className="btn btn-secondary btn-sm me-2">Log In</Link>
            <Link to="/addproducts" className="btn btn-info btn-sm me-2">Add Products</Link>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path='/' element={<Getproducts />} />
            <Route path='/addproducts' element={<Addproducts />} />
            <Route path='/makepayment' element={<Makepayment />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;