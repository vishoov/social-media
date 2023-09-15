import { Routes } from "./Routes";
import { Provider as HomeProvider } from "./context/HomeContext";
import { Provider as NotificationProvider } from "./context/NotificationContext";
import { Provider as SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <>
      <SearchProvider>
        <NotificationProvider>
          <HomeProvider>
            <Routes />
          </HomeProvider>
        </NotificationProvider>
      </SearchProvider>
    </>
  );
}
export default App;
