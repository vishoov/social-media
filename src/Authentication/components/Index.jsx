import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("environment/");
  });

  return (
    <div>
      <h1>Index page</h1>
    </div>
  );
};
