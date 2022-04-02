import React, { useEffect } from "react";
import Amplify from "aws-amplify";
import { AppRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
