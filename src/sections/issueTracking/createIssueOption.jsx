import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import DriverIssue from "./driverIssue/DriverIssueModal"

export default function createIssueOption (){
  return (
    <div>
         <div className="modal">
      <div className="modal-content">
        <span className="close" >&times;</span>
        <h2>Modal Content</h2>
        <nav>
          <Link to="/driverIssue">Issue</Link> 
        </nav>
        <Routes>
          <Route path="driverIssue" element={<DriverIssue/>}/>
        </Routes>
      </div>
    </div>
    </div>
  )
}