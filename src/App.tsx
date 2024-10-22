import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { View } from "./components/test/View";
import { Login } from './components/test/Login';
import { Home } from './components/Home/Home';
import { Menu } from './components/menu/Menu';
import { Dishes } from './components/dishes/Dishes';
import { User } from './components/user/User';
import { Register } from './components/auth/Register';

function App() {

  return (
    <div className='font-gotham-medium '>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<View />}>
            <Route path='/home' element={<Home />} />
            <Route path='/menus' element={<Menu />} />
            <Route path='/dishes' element={<Dishes />} />
            <Route path='/user' element={<User />} />
            {/*   <TestImage /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
