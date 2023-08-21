import { Routes } from "./Routes";
import { Provider } from "./context/ProfileContext";

function App() {
  return (
    <>
      <Provider>
        <Routes />
      </Provider>
    </>
  );
}
export default App;
