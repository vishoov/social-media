import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activationKeyFailure } from "../../redux/IntermediateSlice";

const URLs = () => {
  return axios.create({
    baseURL:
      "http://localhost:9999/ai/intermediateinterface/api/v1/private/activationkey",
  });
};

const initiateIntermediateInterface = (data) => {
  return URLs().post("/addactivationkey", data?.data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data?.Authorization,
    },
  });
};

// hooks

export const useAddActivationKey = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation(initiateIntermediateInterface, {
    onSuccess: (data) => {
      if (data?.data?.data?.socialMediaActivationKey !== null) {
        localStorage.setItem(
          "soc_ak_code",
          data?.data?.data?.socialMediaActivationKey
        );

        navigate("/environment/socialMedia/activate");
      }
    },
    onError: (data) => {
      dispatch(activationKeyFailure(data?.data?.error));
    },
  });
};
