import "./App.css";
import useCounter from "./hooks/useCounter";

const initialValue = 0; // number
const maxValue = null; // number | null
const minValue = null; // number | null
const step = null; // number | null

function App() {
  const { value, increase, decrease, reset } = useCounter(initialValue, maxValue, minValue, step);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{value}</h1>

        <div style={{ display: "flex", gap: 5 }}>
          <button onClick={increase}>INCREASE</button>
          <button onClick={decrease}>DECREASE</button>
          <button onClick={reset}>RESET</button>
        </div>
      </header>
    </div>
  );
}

export default App;
