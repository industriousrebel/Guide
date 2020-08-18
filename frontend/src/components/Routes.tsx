import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Header from './Header'
import Message404 from './Message404'
import Doctor from './home/Doctor'
import Patient from './home/Patient'
import patientData from '../TestRequests/doctor.json'
import docData from '../TestRequests/doctor.json'

// had to change the import of docdata and patientdata here because my react does not support imports outside of src. 
//You can change it back if needed.

function Routes() {

    var doc = '/doctorHome' + docData.id
    var patient = '/patientHome' + patientData.id

    return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/' component={Header} />
              <Route exact path={doc} component={Doctor} />
              <Route exact path={patient} component={Patient} />
              <Route exact path='*' component={Message404} />
            </Switch>
          </BrowserRouter>
        </div>
    )
}

export default Routes