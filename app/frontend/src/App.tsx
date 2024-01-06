import "./App.css"
import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./AppRoute";
import { Provider } from "react-redux";
import { store } from "./store";

const App: React.FC = (): React.JSX.Element => {
  return (
    <>
        {/* TODO: Add more provider if necessary */}
        <div className="min-w-[200px] min-h-[50px] mr-40 ml-40 mt-12">
            <Provider store={store}>
                <BrowserRouter>
                    <AppRoute/>
                </BrowserRouter>
            </Provider>
        </div>
    </>
  )
}
export default App;