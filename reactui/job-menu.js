import { useState } from 'react';
import './App.css';

const JobMenu=(props)=>{
    
    const {job,index}=props;
    const [show,setShow]=useState(false);

    return <>
        {show ? (<div key={index} className="job-big" onClick={()=>setShow(!show)}>
          <h3><b>{job.job_title}</b></h3>
          <p>{job.job_description}</p>
          <p><b>Employer:</b> {job.employer_name}</p>
          <p><b>Location:</b> {job.job_city}, {job.job_country}</p>
          <p><b>Employment Type:</b> {job.job_employment_type}</p>
          <b><b>Qualifications:</b></b> <br/><ul>{job.job_highlights.Qualifications.map((qual, ind) => (<li key={ind}>{qual}</li>))} </ul> 
          <a href={job.job_apply_link} className='green-button'>Apply</a>
          <hr style={{borderTop:"1px dashed black"}} />
        </div>):(<div key={index} className='job-menu' onClick={()=>setShow(!show)}>
          <b>{job.job_title}</b> <span>{job.employer_name}</span>
        </div>)}
    </>
}

export default JobMenu