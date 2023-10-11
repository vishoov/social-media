import { Routes } from "./Routes";

import { Provider as AuthProvider } from "./context/UserContext";
import { Provider as SearchProvider } from "./context/SearchContext";
import { useCallback, useEffect, useState } from "react";
import { AILoader } from "./ReuseableComponents/AILoader";

function App() {
  // State variable to control the loading animation
  const [showLoader, setShowLoader] = useState(true);

  const callBack = useCallback(() => {
    // Simulate loading for 2 seconds
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false); // Hide the loading animation after 2 seconds
    }, 2000);

    // Clean up the timeout when the component unmounts or when the data is loaded
    return () => clearTimeout(loaderTimeout);
  }, []);

  useEffect(() => {
    callBack();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AuthProvider>
        <SearchProvider>
          {showLoader ? <AILoader /> : <Routes />}
        </SearchProvider>
      </AuthProvider>
    </>
  );
}
export default App;
