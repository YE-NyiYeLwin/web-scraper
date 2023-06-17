import { useState } from 'react';
import './App.css';
import JobMenu from './job-menu'

function Job() {
    const [isLoading, setIsLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [searchTerm,setSearchTerm]=useState("");
    const [dis,setDis]=useState(true);
    
    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true);
        setIsLoading(true);
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f096edf43fmsh51d677467224b09p1d76f8jsned521f4b93e6',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
        };

        fetch(`https://jsearch.p.rapidapi.com/search?query=${searchTerm}&num_pages=1`, options)
        .then(response => response.json())
        .then(response => {
            setIsLoading(false);
            setJobs(response.data);
            console.log(response.data);
            setDis(false);
        })
        .catch(err => console.error(err));
    };
    
    if(dis){
    return (<div className='content'>
      <form onSubmit={handleSubmit}>
        <label>
          Search term:
          <input
            type="text"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
            <div className="loading-animation">Loading...</div>
        ) : <></>}
      </div>
    );
    }
    else if(!dis){
    return <div className='content'>
    {jobs.map((job, index) => (
      <div>
        <JobMenu index={index} job={job}  />
      </div>
    ))}
    {isLoading ? (
            <div className="loading-animation">Loading...</div>
        ) : <></>}
    </div>
}}

export default Job