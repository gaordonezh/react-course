import { memo, useCallback, useMemo, useState } from "react";
import "./App.css";

function App() {
  const names = ["Alice", "Bob", "Martín", "Erick"];

  return (
    <div className="App">
      <header className="App-header">
        <GeneradorNombres names={names} />
      </header>
    </div>
  );
}

function GeneradorNombres(props) {
  const { names } = props;
  const [name, setName] = useState(names[0]);

  const getName = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setName(names[index]);
  }, [names]);

  const clearName = useCallback(() => {
    setName(null);
  }, []);

  return (
    <div className="app">
      <h1>Memorize de React con useMemo y useCallback</h1>

      {useMemo(() => {
        console.log("Renderización nombre");
        return <h2>Nombre Generado: {name ? name : "Sin nombre"}</h2>;
      }, [name])}

      <Button label="Generar Nombre" click={getName} />
      <Button label="Borrar Nombre" click={clearName} />
    </div>
  );
}

function WrapperButton(props) {
  return (
    <button
      onClick={() => {
        props.click();
      }}
    >
      {props.label}
    </button>
  );
}

const Button = memo(WrapperButton);

export default App;
