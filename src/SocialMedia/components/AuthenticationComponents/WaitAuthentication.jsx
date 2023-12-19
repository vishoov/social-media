import React from "react";

export const WaitAuthentication = () => {
  return (
    <>
      <div>
        <h4>
          <i className="fa fa-spinner fa-spin"></i>
          <span>
            we sent you a verification link to your email address. Please check
            your email for a verification link.
          </span>
        </h4>
      </div>
    </>
  );
};
