import { useFetch } from './useFetch'
import './App.css'

function App() {

  const { error, data, loading, handleCancelRequest } = useFetch('http://localhost:3000/api/v1/projects')

  return (
    <div className='App'>
      <h1>Fetch Like a PRO</h1>
      <button onClick={handleCancelRequest}>Cancelar</button>
      <div className='card'>
        <ul>
          { error && <li>{error}</li> }
          { loading && <li>...Loading</li> }
          {data?.map((user) => (<li key={user.id}>{user.name}</li>))}
        </ul> 
      </div>
    </div>
  )
}

export default App

