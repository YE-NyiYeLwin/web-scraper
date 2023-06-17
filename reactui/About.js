import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function About() {
  const [isLoading, setIsLoading] = useState(false);
  const [vids, setVids] = useState(null);
  const [searchTerm,setSearchTerm]=useState("");

  const handleVids = event => {
    event.preventDefault();
    setIsLoading(true);
    fetch('http://localhost:3001/youtube')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setVids(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    fetch(`http://localhost:3001/youtube/${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
      console.log(data)
      setVids(data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error(error);
    });
  };

  if (!vids) {
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
      <button onClick={handleVids}>Vids on HomePage</button>
      {isLoading ? (
            <div className="loading-animation">Loading...</div>
        ) : <></>}
      </div>
    );
  }

  return (
    <div className='content'>
      <button onClick={()=>setVids()}>Clear</button>
      <table width="90%" align="center">
      {Object.keys(vids).map((key, index) => (
      <tr style={{backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white'}}><td>
      <div key={key}>
        <h3 style={{fontFamily:"Arial"}}>{vids[key].title}</h3>
      </div></td>
      <td width="20%"><a href={"https://www.youtube.com/"+vids[key].link} target="_blank" rel="noreferrer" class="green-button">Go to Site</a></td></tr>
      ))}
      </table>
    </div>
  );
}

export default About;
