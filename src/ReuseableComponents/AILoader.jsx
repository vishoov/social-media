import React from "react";

export const AILoader = () => {
  // const [requiredData1, setRequiredData1] = useState(null);

  // const { refetch } = useGetProfileDetails(requiredData1);

  // const [cookies] = useCookies(["avt_token"]);

  // useEffect(() => {
  //   console.log("required data :", requiredData1);
  //   if (requiredData1 !== null) {
  //     console.log("required data ----->:", requiredData1);

  //     refetch();
  //   } else {
  //     const reqData = {
  //       Authorization: cookies?.avt_token,
  //     };
  //     console.log("Loading1...", reqData);
  //     setRequiredData1(reqData);
  //     console.log("Loading2...", requiredData1);
  //   }
  // }, [cookies?.avt_token, requiredData1, refetch]);

  return (
    <>
      {/* {socialMediaUser?.value?.SocialMediaUserData !== null ? (
        <Outlet />
      ) : ( */}
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <h3>Logo!!!!</h3>
      </div>
      {/* )} */}
    </>
  );
};
