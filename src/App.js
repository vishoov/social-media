import { Routes } from "./Routes";
import { Provider as HomeProvider } from "./context/HomeContext";
import { Provider as NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <>
      <NotificationProvider>
        <HomeProvider>
          <Routes />
        </HomeProvider>
      </NotificationProvider>
    </>
  );
}
export default App;
