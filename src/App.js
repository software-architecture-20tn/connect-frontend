import "./App.css";
import "./scss/variables.scss";
import Login from "./Pages/Login";

function App() {
  // setToLS('all-themes', themes.default);
  const theme = "light";
  return (
    <div className="App" data-theme={theme}>
      <div className="container">
        <Login />
      </div>
    </div>
  );
}

export default App;
