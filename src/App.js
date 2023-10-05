import { Routes } from "./Routes";
import { Provider as HomeProvider } from "./context/HomeContext";
import { Provider as NotificationProvider } from "./context/NotificationContext";
import { Provider as SearchProvider } from "./context/SearchContext";
import { Provider as MemoryProvider } from "./context/MemoryContext";
import { Provider as ProfileProvider } from "./context/ProfileContext";
import { Provider as AuthProvider } from "./context/UserContext";
import { Provider as MessageProvider } from "./context/MessageContext";
import { useEffect, useState } from "react";
import { AILoader } from "./ReuseableComponents/AILoader";

function App() {
  // State variable to control the loading animation
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false); // Hide the loading animation after 2 seconds
    }, 2000);

    // Clean up the timeout when the component unmounts or when the data is loaded
    return () => clearTimeout(loaderTimeout);
  }, []);

  return (
    <>
      <MessageProvider>
        <AuthProvider>
          <ProfileProvider>
            <SearchProvider>
              <NotificationProvider>
                <HomeProvider>
                  <MemoryProvider>
                    {showLoader ? <AILoader /> : <Routes />}
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
