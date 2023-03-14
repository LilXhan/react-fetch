import { useState, useEffect } from 'react';


export function useFetch(url) {

  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ controller, setController ] = useState(null);

  

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    fetch(url, { signal: abortController.signal })
      .then((response) => response.json()) // pasar el response a json
      .then((data) => setData(data.data)) // setear la data
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request cancelled');
        } else {
          setError(error);
        }
      }) // captar el error
      .finally(() => setLoading(false)); // captar cuando finalice
     
    return () => abortController.abort(); // hace que si el cliente cierra la pagina, el request termina 
  }, []);


  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError('Request cancelled')
    }
  };

  return { error, data, loading, handleCancelRequest };
};



