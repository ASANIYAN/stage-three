import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { CloseCircle } from "iconsax-react";
import { ButtonHoverDark } from "../button/button";

import "./upload.css";
import { ErrorMsg } from "../alert/ErrorMsg";
// import { baseURL } from "../../api/constants/constants";
import { handleMultipleUpload } from "../../api/services/handle-multiple-upload";

const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes;


const schema = yup.object().shape({
    images: yup
    .array()
    .min(1, 'At least one file is required')
    .test(
        'totalSize',
        'Total file size should not exceed 5MB',
        (images) =>
        images.reduce((acc, image) => acc + image.size, 0) <= maxFileSize,
    )
});


const UploadComponent = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { handleSubmit, setValue, formState: { errors }, } = 
    useForm({ 
        resolver: yupResolver(schema),    
        defaultValues: { images: [] }
      });

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      acceptedFiles.forEach((file) => {
        setSelectedImages((prevState) => [...prevState, file]);
      });
    }, []);

    const handleRemoveFile = (imageToRemove) => {
        setSelectedImages((prevImages) => prevImages.filter((image) => image !== imageToRemove));
    };  

    const handleClick = (data) => {
        setLoading(true);
        handleMultipleUpload(data.images)
        .then(() => {
            setLoading(false);
            setSelectedImages([]);
        })
        .catch(() => {
            setError(true);
        })
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        // isDragAccept,
        // isDragReject,
      } = useDropzone({ 
        onDrop,
        accept: "images/*" 
    });

    useEffect(() => {
        return () => selectedImages.forEach(file => URL.revokeObjectURL(file));
    },[selectedImages]);

    
  useEffect(() => {
    // console.log(files)
    setValue("images", selectedImages)
    
  }, [selectedImages, setValue]);

    return (
        <section className="w-[1200px] max-w-[90%] mx-auto">
            <section
            {...getRootProps({
                className: 'dropzone w-full h-40 my-8 bg-[#eee] cursor-pointer border-2 border-dashed border-[#aaa] flex items-center justify-center font-medium text-[#333]'
            })}
            >
                <input {...getInputProps()} />
                <section>
                    {isDragActive ? (
                    <p>Drop file(s) here ...</p>
                    ) : (
                    <p>Drag and drop file(s) here, or click to select files</p>
                    )}
                </section>
            </section>
            <section className="flex justify-center -translate-y-5">
                { errors["images"] && <ErrorMsg msg={errors["images"].message} /> }
                { error && <ErrorMsg msg={"Error occurred"} /> }
            </section>
           { selectedImages.length > 0 &&  
                <section className="my-5 flex justify-center">
                    {loading 
                        ?
                        <ButtonHoverDark text="Loading..." />
                        : 
                        <ButtonHoverDark text="Upload" handleClick={handleSubmit(handleClick)} />
                    }
                </section>
            }
            <section className="images">
                { selectedImages.length > 0 && selectedImages.map((image, index) => (
                        <section className="relative" key={index}>
                            <img
                                src={`${URL.createObjectURL(image)}`} 
                                onLoad={() => { URL.revokeObjectURL(image)}}
                                alt="" 
                            />
                            <CloseCircle 
                                className="absolute top-1.5 right-1.5 cursor-pointer z-10" 
                                color="#000000" 
                                variant="Bold"
                                onClick={() => handleRemoveFile(image)}
                            />
                        </section>
                        ))
                }
            </section>
        </section>
    );
}
 
export default UploadComponent;