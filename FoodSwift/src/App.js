import './App.css';
import Home from './screens/Home';
import { CartProvider } from './components/contextReducer.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import Cart from './screens/Cart.js';
import MyOrders from './screens/MyOrders.js';

function App() {
  return (
    <>
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/myOrder' element={<MyOrders/>}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
    



    </>
  );
}

export default App;
