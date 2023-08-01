import { Route, Routes } from "react-router-dom";
import { AISignup } from "./Authentication/components/AISignup";
import { AIHome } from "./Authentication/components/AIHome";
import { Index } from "./Authentication/components/Index";
import { AISignin } from "./Authentication/components/AISignin";
import { AIAuthUserNameForgotPassword } from "./Authentication/components/AIAuthUserNameForgotPassword";
import { AIGenerateVerificationCodeForgotPassword } from "./Authentication/components/AIGenerateVerificationCodeForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<AISignup />} />
        <Route path="/home" element={<AIHome />} />
        <Route path="/signin" element={<AISignin />} />
        <Route
          path="/authUserNameVerificationForgotPassword"
          element={<AIAuthUserNameForgotPassword />}
        />
        <Route
          path="/GenerateVerificationCodeForgotPassword"
          element={<AIGenerateVerificationCodeForgotPassword />}
        />
      </Routes>
    </div>
  );
}

export default App;
