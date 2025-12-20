import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imagefile) => {
  const formData = new FormData();
  formData.append("Image", imagefile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", //set header for file upload
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; //rethrow error for handling in calling function
  }
};

export default uploadImage;