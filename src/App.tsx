import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { View } from "./components/test/View";
import { Login } from './components/test/Login';
import { Home } from './components/Home/Home';

function App() {

  return (
    <div className='font-gotham-medium '>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<View />}>
            <Route path='/home' element={<Home />} />
            {/*   <TestImage /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
