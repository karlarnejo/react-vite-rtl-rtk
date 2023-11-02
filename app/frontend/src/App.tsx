import "./App.css"
import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./AppRoute";
import { Provider } from "react-redux";
import { store } from "./store";

const App: React.FC = (): React.JSX.Element => {
  return (
    <>
        {/* TODO: Add more provider if necessary */}
        <Provider store={store}>
            <BrowserRouter>
                <AppRoute/>
            </BrowserRouter>
        </Provider>
    </>
  )
}
export default App;