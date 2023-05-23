import { Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Error from './pages/Error';
import Header from './components/Header';

function App() {
  return (
      <>
      <Header/>
        <Routes>
            <Route path="/" element={ <Home/>}></Route>
            <Route path="*" element={ <Error/>}></Route>
        </Routes>
      </>
  );
}

export default App;
