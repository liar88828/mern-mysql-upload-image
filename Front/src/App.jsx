import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    // const api = 'http://localhost:8880/books'

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'*'} element={<div><h1>wrong</h1></div>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App
