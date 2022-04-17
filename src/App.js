import './App.css';

import {BrowserRouter as Router, Navigate, Route, Routes,} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Devices from './components/devices';
import Services from './components/services';
import Email from './components/email';
import Messages from './components/messages';
import Orders from './components/orders';
import Profile from './components/profile';
import Returns from './components/returns';
import Home from './components/home';
import Contacts from './components/contacts';
import AddContacts from './components/contactsAdd';
import NoPage from './components/noPage';

function App() {
    return (
        <div>
            <Header/>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home"/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/devices" element={<Devices/>}/>
                    <Route path="/email" element={<Email/>}/>
                    <Route path="/messages" element={<Messages/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/returns" element={<Returns/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContacts/>}/>
                    <Route path="/*" element={<NoPage/>}/>
                </Routes>
            </Router>


            <Footer/>
        </div>


    );
}

export default App;
