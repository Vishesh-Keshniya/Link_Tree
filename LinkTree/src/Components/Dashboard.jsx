import React from 'react'
import Sidebar from './Sidebar'
import DashContent from './Dashboard/Dashcontent'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className='dash'>
      <div className='l'>  <Sidebar/></div>
        <div className='r'><DashContent/></div>
    </div>
  )
}

export default Dashboard