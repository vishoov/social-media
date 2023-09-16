// import React, { useContext, useEffect, useState } from "react";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import { ShowMemoryModel } from "./ShowMemoryModel";
// import { useGetAllMemories } from "../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
// import { useCookies } from "react-cookie";
// import { Context as MemoryContext } from "../../context/MemoryContext";

// const PAGE_SIZE = 12;

// export const MemoryImages = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImageUrl, setSelectedImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [requiredData, setRequiredData] = useState(null);

//   const [cookies] = useCookies();
//   const {
//     state: { socialMediaMemories },
//   } = useContext(MemoryContext);

//   const { refetch } = useGetAllMemories(requiredData);

//   const openModel = (item) => {
//     setSelectedImageUrl(item);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedImageUrl("");
//     setIsModalOpen(false);
//   };

//   const handleScroll = () => {
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || document.body.clientHeight;

//     if (scrollHeight - scrollTop === clientHeight && !loading) {
//       // User has scrolled to the bottom.
//       setLoading(true);

//       console.log("hello world!");

//       const memoryData = {
//         Authorization: cookies?.avt_token,
//         userId: localStorage.getItem("sm_user_id"),
//         pageNumber: pageNumber++,
//       };
//       setRequiredData(memoryData);

//       if (requiredData !== null) {
//         refetch();
//       }

//       // Fetch more memories using your Redux action.
//       // dispatch(fetchMoreMemories()).then(() => {
//       //   setLoading(false);
//       // });
//     }
//   };

//   useEffect(() => {
//     console.log("hello world!111");
//     console.log("hello world!222", socialMediaMemories);
//   }, [socialMediaMemories]);

//   return (
//     <ImageList
//       sx={{
//         width: 1200,
//         height: 600,
//       }}
//       cols={3}
//       onScroll={() => handleScroll()}
//     >
//       {socialMediaMemories !== undefined &&
//         socialMediaMemories?.map((images) => {
//           return (
//             <ImageListItem key={images?.urls}>
//               <img
//                 src={images?.urls}
//                 srcSet={images?.urls}
//                 alt="imageNotFound"
//                 loading="lazy"
//                 style={{
//                   marginTop: 10,
//                   marginLeft: 10,
//                   width: 390,
//                   height: 390,
//                   cursor: "pointer",
//                 }}
//                 onClick={() => openModel(images)}
//               />
//             </ImageListItem>
//           );
//         })}
//       {loading && <h2>hello</h2>}
//       {isModalOpen && (
//         <ShowMemoryModel
//           item={selectedImageUrl}
//           open={isModalOpen}
//           onClose={closeModal}
//           username="JennaOrtega"
//           other={false}
//         />
//       )}
//     </ImageList>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ShowMemoryModel } from "./ShowMemoryModel";
import { useGetAllMemories } from "../../SocialMedia/APIs/SocialMediaMemoryInterfaceAPI";
import { useCookies } from "react-cookie";
import { Context as MemoryContext } from "../../context/MemoryContext";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const PAGE_SIZE = 12; // Number of images to load per page

export const MemoryImages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [requiredData, setRequiredData] = useState(null);

  const [cookies] = useCookies();
  const {
    state: { socialMediaMemories },
    // Assuming you have a dispatch function in your context
  } = useContext(MemoryContext);

  const memories = useSelector((state) => state.memories);

  const { refetch } = useGetAllMemories(requiredData);

  const openModel = (item) => {
    setSelectedImageUrl(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageUrl("");
    setIsModalOpen(false);
  };

  const handleScroll = (e) => {
    const target = e.target;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    console.log(Math.ceil(scrollHeight - scrollTop) <= clientHeight);
    console.log(!loading);

    console.log(Math.ceil(scrollHeight - scrollTop));

    if (
      Math.round(scrollHeight - scrollTop) <= clientHeight &&
      !loading &&
      memories?.value?.memoryNotFoundError === null
    ) {
      // User has scrolled to the end of the ImageList.
      setLoading(true);

      const memoryData = {
        Authorization: cookies?.avt_token,
        userId: localStorage.getItem("sm_user_id"),
        pageNumber: Math.ceil(socialMediaMemories?.length / PAGE_SIZE) + 1,
      };
      setRequiredData(memoryData);
    }
  };

  useEffect(() => {
    if (requiredData) {
      // Fetch more memories using your API and append them to socialMediaMemories
      refetch();
      setLoading(false);
    }
  }, [requiredData, refetch]);

  return (
    <div>
      <ImageList
        className="my-image-list" // Add a class name for targeting the ImageList
        sx={{
          width: 1200,
          height: 600,
        }}
        cols={3}
        onScroll={(e) => handleScroll(e)}
      >
        {socialMediaMemories !== undefined &&
          socialMediaMemories.map((images) => {
            return (
              <ImageListItem key={images?.urls}>
                <img
                  src={images?.urls}
                  srcSet={images?.urls}
                  alt="imageNotFound"
                  loading="lazy"
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    width: 390,
                    height: 390,
                    cursor: "pointer",
                  }}
                  onClick={() => openModel(images)}
                />
              </ImageListItem>
            );
          })}
      </ImageList>
      {loading && <CircularProgress />}
      {isModalOpen && (
        <ShowMemoryModel
          item={selectedImageUrl}
          open={isModalOpen}
          onClose={closeModal}
          username="JennaOrtega"
          other={false}
        />
      )}
    </div>
  );
};
