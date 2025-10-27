import { useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  return (
    <Router>
      <LoadingBar
          color="#ff0033ff"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={9} country={"us"} category={"general"}/>}/>
        <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={9} country={"us"} category={"business"}/>}/>
        <Route path="/politics" element={<News apiKey={apiKey} setProgress={setProgress} key="politics" pageSize={9} country={"us"} category={"politics"}/>}/>
        <Route path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={9} country={"us"} category={"entertainment"}/>}/>
        <Route path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={9} country={"us"} category={"health"}/>}/>
        <Route path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={9} country={"us"} category={"science"}/>}/>
        <Route path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={9} country={"us"} category={"technology"}/>}/>
        <Route path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={9} country={"us"} category={"sports"}/>}/>
      </Routes>
    </Router>
  )
}

export default App
