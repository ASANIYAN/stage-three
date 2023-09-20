import { baseURL } from "../constants/constants";

export const handleMultipleUpload = (images) => {
    const url = `${baseURL}/image/upload`;
    const presetName = import.meta.env.VITE_PRESET_NAME;
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
  
    const uploadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", presetName);
        formData.append("cloud_name", cloudName);
  
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  
    return Promise.all(uploadPromises);
};