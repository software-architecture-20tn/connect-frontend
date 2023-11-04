import "./App.css";
import "./scss/variables.scss";
import Login from "./Pages/LogIn";
// import Signup from "./Pages/Signup";

function App() {
  // setToLS('all-themes', themes.default);
  const theme = "light";
  return (
    <div className="App" data-theme={theme}>
      <div>
        <Login />
        {/* <Signup /> */}
      </div>
    </div>
  );
}

export default App;
