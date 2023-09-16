import { Routes } from "./Routes";
import { Provider as HomeProvider } from "./context/HomeContext";
import { Provider as NotificationProvider } from "./context/NotificationContext";
import { Provider as SearchProvider } from "./context/SearchContext";
import { Provider as MemoryProvider } from "./context/MemoryContext";

function App() {
  return (
    <>
      <SearchProvider>
        <NotificationProvider>
          <HomeProvider>
            <MemoryProvider>
              <Routes />
            </MemoryProvider>
          </HomeProvider>
        </NotificationProvider>
      </SearchProvider>
    </>
  );
}
export default App;
