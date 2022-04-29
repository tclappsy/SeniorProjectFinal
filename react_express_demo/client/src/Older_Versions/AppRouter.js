import Error_Route_LoggedOut from './Error_Route_LoggedOut.js';
import Error_Route_LoggedIn from "./Error_Route_LoggedIn.js";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Map from './Map';
import Login from './Login';
import Logout from "./Logout";
import SymptomsV5 from './SymptomsV5';
import Register from './Register';
import Home from './Home';
import HomeLogin from "./HomeLogin";
import Profile from "./Profile";
import Nav_Login from "./Nav_Login"
import Nav_Logout from "./Nav_Logout"

function AppRouter (props) {

    function getCookie() {
        let cookie = document.cookie;
         if(cookie === '') {
              console.log('cookie exists: ', cookie);
  
            //return appropriate routes
            return( 
              <div>
                  <Routes>
                    <Route path = "/home" element = {<Home />}/>
                    <Route path = "/" element = {<Home />}/>
                    <Route path = "/diagnosis" element = {<SymptomsV5 />}/>
                    <Route path = "/map" element = {<Map prop = {"urgent care"}/> } />
                    <Route path = "/logout" element = {<Logout />} />
                    <Route path = "/profile" element = {<Profile />} />
                    <Route path = "*" element = {<Error_Route_LoggedIn />} />
                  </Routes>
              </div>
            )
  
          } else {
              return (
                <div>
                   <Router>
                    <Routes>
                        <Route element = {<Nav_Logout />} >
                        <Route path = "/register" element = {<Register />}/>
                        <Route path = "/" element = {<HomeLogin />} />
                        <Route path = "/login" element = {<Login />} />
                        <Route path = "*" element = {<Error_Route_LoggedOut />} />
                      </Route>
                    </Routes>
                  </Router>
                </div>
              )
          }
      }

      return (
          <div>
            {getCookie()}
          </div>
      );
}

export default AppRouter;