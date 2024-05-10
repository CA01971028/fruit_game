import { useEffect, useState } from 'react';
import axios from "axios";

interface Data {
  name: string;
  age: number;
  job: string;
}

function Flask() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')
      .then((response) => {setData(response.data)})
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <header >
        <div>
          {data && (
            <div>
              <p>Name: {data.name}</p>
              <p>Age: {data.age}</p>
              <p>Job: {data.job}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Flask;