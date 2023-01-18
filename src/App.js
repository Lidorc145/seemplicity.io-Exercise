import './App.css';
import {NavBar} from "./components/NavBar";
import FindingTable from "./components/FindingTable";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <div className="body">
                <FindingTable/>

            </div>
        </div>
    );
}

export default App;
