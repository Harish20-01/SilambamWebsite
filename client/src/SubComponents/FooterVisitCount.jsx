import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsEye } from 'react-icons/bs';
const FooterVisitCount = ({count}) => {
  return (
    <div className='footer-copyright footer-visitCount' style={{borderBottom:"none"}}>
      <div>Total Visitors:<span>{count==null?"....":count}<BsEye/></span></div>
      <div>Last Updated:<span>{new Date().toLocaleDateString()}<FaRegCalendarAlt/></span></div>
    </div>
  )
}

export default FooterVisitCount
