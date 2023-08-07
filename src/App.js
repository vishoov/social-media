import { Route, Routes } from "react-router-dom";
import { AISignup } from "./Authentication/components/AISignup";
import { AIHome } from "./Authentication/components/AIHome";
import { Index } from "./Authentication/components/Index";
import { AISignin } from "./Authentication/components/AISignin";
import { AIAuthUserNameForgotPassword } from "./Authentication/components/AIAuthUserNameForgotPassword";
import { AIChangePassword } from "./Authentication/components/AIChangePassword";
import { WaitAuthentication } from "./Authentication/components/WaitAuthentication";
import { AIAuthentication } from "./Authentication/components/AIAuthentication";

function App() {
  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<AISignup />} />
        <Route path="/signin" element={<AISignin />} />
        <Route
          path="/forgotPassword/auth"
          element={<AIAuthUserNameForgotPassword />}
        />
        <Route path="/reset/password" element={<AIChangePassword />} />
        <Route path="/wait/reset" element={<WaitAuthentication />} />

        {/* private routes */}
        <Route element={<AIAuthentication />}>
          <Route path="/home" element={<AIHome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
