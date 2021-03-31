import { Route, Switch } from "react-router-dom";
import MoviesPage from "./components/pages/MoviesPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={MoviesPage} />
      </Switch>
    </Provider>
  );
}

export default App;
