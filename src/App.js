import './App.css';
import {NavBar} from "./components/NavBar";
import FindingTable from "./components/FindingTable";

function App() {
    return (
        <div className="App">
<NavBar />
            <div className="body">
                <h1 className="text-3xl font-bold text-left">
                    Findings
                </h1>
                <FindingTable />

                </div>
        </div>
    );
}

export default App;
