import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState(null);
  const [searchTerm,setSearchTerm]=useState("");

  const handleNews = event => {
    event.preventDefault();
    setIsLoading(true);
    fetch('http://localhost:3001/news')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setNews(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    fetch(`http://localhost:3001/search/${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
      console.log(data)
      setNews(data);
      setIsLoading(false);
    })
      .catch(error => {
        console.error(error);
      });
  };

  if (!news) {
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
      <button onClick={handleNews}>All News</button>
      {isLoading ? (
            <div className="loading-animation">Loading...</div>
        ) : <></>}
      </div>
    );
  }

  return (
    <div className='content'>
      <button onClick={()=>setNews()}>Clear</button>
      {isLoading ? (
            <div className="loading-animation">Loading...</div>
        ) : <></>}
      <table width="90%" align="center">
      {Object.keys(news).map((key, index) => (
      <tr><td>
      <div key={key}>
        <h3 style={{fontFamily:"Arial"}}>{news[key].title}</h3>
      </div></td>
      <td width="20%"><a href={news[key].url} target="_blank" rel="noreferrer" class="green-button">Go to Site</a></td></tr>
      ))}
      </table>
    </div>
  );
}

export default App;
