import { Routes } from "./Routes";

function App() {
  // let element = useRoutes([
  //   {
  //     path: "environment/",
  //     element: <Index />,
  //     children: [
  //       {
  //         path: "signup",
  //         element: <AISignup />,
  //       },
  //       {
  //         path: "signin",
  //         element: <AISignin />,
  //       },
  //       {
  //         path: "forgotPassword/auth",
  //         element: <AIAuthUserNameForgotPassword />,
  //       },
  //       {
  //         path: "reset/password",
  //         element: <AIChangePassword />,
  //       },
  //       {
  //         path: "wait/reset",
  //         element: <WaitAuthentication />,
  //       },
  //     ],
  //   },
  //   {
  //     element: <AIAuthentication />,
  //     children: [
  //       {
  //         path: "/home",
  //         element: <AIHome />,
  //       },
  //       {
  //         path: "/environment/socialMedia/activate",
  //         element: <SocialMediaActivationInterface />,
  //       },
  //     ],
  //   },
  // ]);

  // return element;
  return (
    //   <div>
    //     <Routes>
    //       {/* public routes */}
    //       <Route path="/" element={<Index />} />
    //       <Route path="/signup" element={<AISignup />} />
    //       <Route path="/signin" element={<AISignin />} />
    //       <Route
    //         path="/reset/password/auth"
    //         element={<AIAuthUserNameForgotPassword />}
    //       />
    //       <Route path="/reset/password" element={<AIChangePassword />} />
    //       <Route path="/wait/reset" element={<WaitAuthentication />} />

    //       {/* private routes */}
    //       <Route element={<AIAuthentication />}>
    //         <Route path="/home" element={<AIHome />} />
    //         <Route
    //           path="/environment/socialMedia/activate"
    //           element={<SocialMediaActivationInterface />}
    //         />
    //       </Route>
    //     </Routes>
    //   </div>
    <Routes />
  );
}

export default App;
