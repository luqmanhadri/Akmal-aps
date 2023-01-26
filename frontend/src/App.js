import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inventory from './pages/Inventory/Inventory';
import Search_Profile from './pages/Profile/Search_Profile';
import Spesific_Profile from './pages/Profile/Spesific_Profile';
import Team_Sheet from './pages/Team Management/Team_Sheet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Booking from './pages/Booking/Booking';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import NavbarC from './components/Navbar/NavbarC'
import Landing from './pages/Landing/Landing';
import Search_Result from './pages/Profile/Search_Result';
import RegisterOthers from './pages/Authentication/RegisterOthers';
import Own_Profile from './pages/Profile/Own_Profile';
import Update_Profile from './pages/Profile/Update_Profile';
import Home from './pages/Dashboards/Home';
import Admin from './pages/Dashboards/Admin';
import Team_Dashboard from './pages/Team Management/Team_Dashboard';
import Video from './pages/Videos/Video';
import List from './pages/Booking/List';
import {useSelector} from "react-redux"
import { logout } from './redux/userSlice';
import {useDispatch} from 'react-redux'
import Player_DB from './pages/Team Management/Player_DB';
import Fitness from './pages/Alep/Fitness';
import Wellness from './pages/Alep/Wellness';
import AddEvent from './pages/Alep/AddEvent';
import Schedule from './pages/Alep/Schedule';
import Search_Team from './pages/Team Management/Search_Team';
import Team_Profile from './pages/Team Management/Team_Profile';
import CartPage from './pages/Booking/CartPage';
import Storekeeper from './pages/Dashboards/Storekeeper/Storekeeper';
import ManageBooking from './pages/Dashboards/Storekeeper/ManageBooking';
import InventoryList from './pages/Dashboards/Storekeeper/InventoryList';
import { ToastContainer } from 'react-toastify';
import BookingStatus from './pages/Booking/BookingStatus';

function App() {
  // const client = new QueryClient();
  //<QueryClientProvider client={client}></QueryClientProvider>
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  return (
    
    <Router>
    <NavbarC/>
    
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="profile/:id" element={<Spesific_Profile />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="search_profile" element={<Search_Profile />} />
            <Route path="search" element={<Search_Result />} />
            <Route path="search_item" element={<List />} />
            <Route path="team_sheet/:id" element={<Team_Sheet />} />
            <Route path="registerothers" element={<Register />} />
            <Route path="booking" element={<Booking />} />
            <Route path="*" element={<h1> PAGE NOT FOUND </h1>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegisterOthers />} />
            <Route path="spesific_profile/:id" element={<Own_Profile />} />
            <Route path="update_profile" element={<Update_Profile />} />
            <Route path="home" element={<Home />} />
            <Route path="list" element={<List />} />
            <Route path="admin" element={<Admin />} />
            <Route path="video/:id" element={<Video />} />
            <Route path="team_dashboard/:id" element={<Team_Dashboard />} />
            <Route path="player_database/:sport" element={<Player_DB />} />
            <Route path="fitness" element={<Fitness />} />
            <Route path="wellness" element={<Wellness />} />
            <Route path="schedule/addevent" element={<AddEvent />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="search_team" element={<Search_Team />} />
            <Route path="team/:id" element={<Team_Profile />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="storekeeper" element={<Storekeeper />} />
            <Route path="bookingstatus/:id" element={<BookingStatus />} />
            <Route path="managebooking" element={< ManageBooking/>} />
            <Route path="inventorylist" element={< InventoryList/>} />
          </Route>
        </Routes>
    </Router>
      
  );
}

export default App;
