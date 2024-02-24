import './index.css'
import { Route, Routes } from 'react-router-dom'
import Username from './components/Username';
import ResetPassword from './components/ResetPassword';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import Password from './components/Password';
import Pagenotfound from './components/Pagenotfound'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element=<Username />></Route>
        <Route path='/ResetPassword' element=<ResetPassword />></Route>
        <Route path='/Register' element=<Register />></Route>
        <Route path='/Recovery' element=<Recovery />></Route>
        <Route path='/Profile' element=<Profile />></Route>
        <Route path='/Password' element=<Password />></Route>
        <Route path='/Pagenotfound' element=<Pagenotfound />></Route>
      </Routes>
    </div>

  )
}

export default App
