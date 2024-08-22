import './App.css';
//import KMP from './KMP/kmp';
import MapPage from '../src/DIJKSTRA/mapPage/mapPage.tsx';


export const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

function App() {
  console.log("olha a chave do react: " + REACT_APP_GOOGLE_API_KEY)
  return <MapPage/>
}

export default App;
