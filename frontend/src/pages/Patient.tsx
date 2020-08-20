import React from 'react'
import Footer from '../components/Footer'
import PatientData from '../testrequests/patient.json'

function Patient() {
    return(
        <div className='patient'>
          <header>
            <h2 className='welcome'>Welcome {PatientData.firstName} {PatientData.lastName}</h2>
          </header>
          <button className='search-derm' type='button'>Search Nearest Dermatologists</button>
          <Footer />
        </div>
    )
}

export default Patient