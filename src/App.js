import "./App.css";
import "./scss/variables.scss";
import Login from "./Pages/Login";

function App() {
  // setToLS('all-themes', themes.default);
  const theme = "light";
  return (
    <div className="App" data-theme={theme}>
      <div>
        App
      </div>
    </div>
  );
}

export default App;
