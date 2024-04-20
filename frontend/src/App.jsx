import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import { CustomerLogin } from './component/CustomerLogin';
import {OwnerLogin} from './component/OwnerLogin'
import { SearchPage } from './component/SearchPage';
import { CustomerSignup } from './component/CustomerSignup';
import { OwnerSingup } from './component/OwnerSingup';
import { OwnerPage } from './component/OwnerPage';
import { Finished } from './component/Finished';
import { mobilenumber } from './contextsharing/mobilenumber';

function App() {
  return (
    
    <Router>
      <Routes>
      
        <Route path='/' element={<Home />} />
        <Route path='/customersignup' element={<CustomerSignup/>}></Route>
        <Route path='/OwnerSignup' element={<OwnerSingup/>}></Route>
        <Route path='/customerlogin' element={<CustomerLogin />} />
        <Route path='/busownerlogin' element={<OwnerLogin />} />
        <Route path='/searchpage' element={<SearchPage/>}/>
        <Route path='/ownerpage' element={<OwnerPage/>}></Route>
        <Route path='/finished' element={<Finished/>}></Route>
        
      </Routes>
    </Router>
    
    
  );
}

export default App;
