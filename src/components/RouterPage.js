import React from  'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import CustomerList from './admin/CustomerList';
import AllCustomers from './admin/AllCustomers';
import AllCustomersWithFunds from './admin/AllCustomersWithFunds';
import Medicine from './admin/Medicine';
import Login from './Login';
import MedicineDisplay from './users/MedicineDisplay';
import Registration from './Registration';
import Cart from './users/Cart';
import Dashboard from './users/Dashboard';
import Orders from './users/Orders';
import Profile from './users/Profile';
import Receipt from './users/Receipt';
import AllUserStorno from './users/AllUserStorno';
import AllUserOrders from './users/AllUserOrders';
import Storno from './users/Storno';
import SalesReport from './admin/SalesReport';
import StornoReport from './admin/StornoReport';
import SideMenu from './users/SideMenu';
import ReceiptForCompany from './users/ReceiptForCompany';
import StornoForCompany from './users/StornoForCompany';
import AllSales from './admin/AllSales';
import AllStorno from './admin/AllStorno';

export default function RouterPage(){
    
    return(
        <Router>
            <Routes>
                <Route exact path='/' element={ <Login /> } />
                <Route path='/registration' element={ <Registration /> } />
                <Route path='/dashboard' element={ <Dashboard /> } />                
                <Route path='/myorders' element={ <Orders /> } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/cart' element={ <Cart /> } />

                <Route path='/admindashboard' element={ <AdminDashboard /> } />
                <Route path='/adminorders' element={ <AdminOrders /> } />
                <Route path='/allsales' element={ <AllSales /> } />
                <Route path='/allstorno' element={ <AllStorno /> } />
                <Route path='/alluserstorno' element={ <AllUserStorno /> } />
                <Route path='/alluserorders' element={ <AllUserOrders /> } />
                <Route path='/customers' element={ <CustomerList /> } />
                <Route path='/allcustomers' element={ <AllCustomers /> } />
                <Route path='/allcustomerswithfunds' element={ <AllCustomersWithFunds /> } />
                <Route path='/medicine' element={ <Medicine /> } />

                <Route path='/products' element={ <MedicineDisplay /> } />
                <Route path='/receipt/:id' element={ <Receipt /> } />
                <Route path='/receiptforcompany/:id' element={ <ReceiptForCompany /> } />
                <Route path='/storno/:id' element={ <Storno /> } />
                <Route path='/stornoforcompany/:id' element={ <StornoForCompany /> } />
                <Route path='/salesreport/:id' element={ <SalesReport /> } />
                <Route path='/stornoreport/:id' element={ <StornoReport /> } />
                <Route path='/sidemenu' element={ <SideMenu /> } />

            </Routes>
        </Router>
    )
}