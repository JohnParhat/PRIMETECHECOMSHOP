import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { userInputs, productInputs } from './formSource';
import './style/dark.scss';
import { useSelector } from 'react-redux';

function App() {
  const { darkMode } = useSelector((state) => state.darkMode);

  // const admin = JSON.parse(
  //   JSON.parse(localStorage.getItem('persist:root')).user
  // ).currentUser.isAdmin;
  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path='/login'>
            <Route index element={<Login />} />
          </Route>
          {
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='users'>
                <Route index element={<List />} />
                <Route path=':userId' element={<Single />} />
                <Route
                  path='new'
                  element={<New inputs={userInputs} title='Add New User' />}
                />
              </Route>
              <Route path='products'>
                <Route index element={<List />} />
                <Route path=':productId' element={<Single />} />
                <Route
                  path='new'
                  element={
                    <New inputs={productInputs} title='Add New Broduct' />
                  }
                />
              </Route>
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
