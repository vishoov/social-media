import { Routes } from "./Routes";
import { Provider as HomeProvider } from "./context/HomeContext";
import { Provider as NotificationProvider } from "./context/NotificationContext";
import { Provider as SearchProvider } from "./context/SearchContext";
import { Provider as MemoryProvider } from "./context/MemoryContext";
import { Provider as ProfileProvider } from "./context/ProfileContext";
import { Provider as AuthProvider } from "./context/UserContext";
import { Provider as MessageProvider } from "./context/MessageContext";

function App() {
  return (
    <>
      <MessageProvider>
        <AuthProvider>
          <ProfileProvider>
            <SearchProvider>
              <NotificationProvider>
                <HomeProvider>
                  <MemoryProvider>
                    <Routes />
                  </MemoryProvider>
                </HomeProvider>
              </NotificationProvider>
            </SearchProvider>
          </ProfileProvider>
        </AuthProvider>
      </MessageProvider>
    </>
  );
}
export default App;
