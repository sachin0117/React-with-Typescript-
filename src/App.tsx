
import "./App.css"
import { Provider } from "react-redux";
import Routes from "./router/Routing";
import store from "./store/Index";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  )
}
