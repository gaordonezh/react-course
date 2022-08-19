import { useEffect, useState } from "react";
import useBoolean from "./hooks/useBoolean";
import useList from "./hooks/useList";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";

const defaultConfig = { theme: "dark", lang: "es" };

function App() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useBoolean(false);
  const [error, setError] = useBoolean(false);
  const [config, setConfig] = useLocalStorage("config", defaultConfig);

  const handleChange = () => {
    const theme = config.theme === "light" ? "dark" : "light";
    const lang = config.lang === "es" ? "en" : "es";
    setConfig((oldConfig) => ({ ...oldConfig, theme, lang }));
  };

  const users = useList([]);
  const [newUser, setNewUser] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    users.push(newUser);
    setNewUser("");
  };

  const handleInputChange = (event) => {
    setNewUser(event.target.value);
  };

  useEffect(() => {
    setCargando.on();
    setError.off();

    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((res) => setLista(res.data))
      .catch((err) => setError.on())
      .finally(() => setCargando.off());
  }, [setLista, setCargando, setError]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          THEME: {config.theme}
          <br />
          LANG: {config.lang}
        </h1>
        <button onClick={handleChange}>CHANGE LOCALSTORAGE</button>
        {cargando ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Ha ocurrido un error</p>
        ) : (
          <section>
            {lista.map((item) => (
              <div key={item.id} style={{ borderBottom: "1px solid #555", display: "flex", flexDirection: "row" }}>
                <img alt={item.id} src={item.avatar} style={{ objectFit: "cover" }} />
                <div style={{ padding: "0 10px" }}>
                  <p style={{ fontSize: 25 }}>{`${item.first_name} ${item.last_name}`}</p>
                  <p style={{ fontSize: 18 }}>{item.email}</p>
                </div>
              </div>
            ))}

            <form onSubmit={handleSubmit}>
              <input value={newUser} onChange={handleInputChange} placeholder="New user" type="text" />
              <button type="submit">Create user</button>
            </form>

            {users.isEmpty() ? (
              "NO NEW USERS FOUND"
            ) : (
              <ul>
                {users.value.map((user, index) => (
                  <li key={index}>
                    <input type="checkbox" onClick={() => users.remove(index)} checked={false} />
                    <p>{user}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </header>
    </div>
  );
}

export default App;
