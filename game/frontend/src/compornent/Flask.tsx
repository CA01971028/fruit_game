import { useEffect, useState } from 'react';
import axios from "axios";

interface Data {
  name: string;
  age: number;
  job: string;
}


function Flask() {
  const [data, setData] = useState<Data | null>(null);
  const [scores, setScores] =useState<number[]>([]);
  const [name,setName] = useState<string[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')
      .then((response) => {setData(response.data)})
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data/test')
      .then((response) => {
        setScores(response.data.scores);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() =>{
    axios.get('http://127.0.0.1:5000/api/data/name')
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => console.error(error));
  },[]);

  return (
    <div>
      <header >
        <div>
          {data && (
            <div>
              <p>Name: {name[1]}</p>
              {/* <p>Age: {data.age}</p> */}
              {/* <p>Job: {data.job}</p> */}
              <p>Score:{scores[1]}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Flask;