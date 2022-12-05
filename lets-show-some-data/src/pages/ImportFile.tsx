import React, {useState} from "react";
import {useDataApi} from "../hooks/useApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ResultPopup from "../components/UI/ResultPopup";
import {faTimes, faUpload} from "@fortawesome/free-solid-svg-icons";

const ImportFile: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const {fileUpload, isLoading, error, isSuccess, cancel, reset} = useDataApi();
    const [fileValue, setFileValue] = useState<string | undefined>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            try {
                await fileUpload("upload", file);
                setFile(null);
            } catch (e) {

            }
        }
    };

    const handleCancel = () => {
        cancel();
        setFile(null);
        setFileValue(undefined);
    }

    return (
        <div className="bg-white rounded-lg shadow p-6 my-8 space-y-6">
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-6">
                    <h3 className="font-bold text-xl mb-4">Upload File</h3>
                    <input type="file"
                           className="w-full py-2 px-3 rounded-lg bg-gray-100 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 mb-4"
                           onChange={handleChange}
                           required
                    />
                    <div className="flex items-center justify-between">
                        <button type="button"
                                className="text-sm font-medium bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-l cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleCancel}
                                disabled={!isLoading}>
                            <FontAwesomeIcon icon={faTimes} className="mr-2"/> Cancel
                        </button>
                        <button type="submit"
                                className="text-sm font-medium bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-r disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                disabled={!file || isLoading}>
                            <FontAwesomeIcon icon={faUpload} className="mr-2"/> {isLoading ? "Uploading..." : "Upload"}
                        </button>
                    </div>


                    {file && (
                        <div className="mt-4">
                            <p className="font-bold">Selected file: {file.name}</p>
                            <p>Size: {file.size} bytes</p>
                        </div>
                    )}
                </div>
            </form>


            <ResultPopup
                show={isSuccess}
                message="The file was successfully uploaded."
                bgColor="bg-green-300"
            />
            <ResultPopup
                show={!!error}
                message="There was an error uploading the file."
                bgColor="bg-red-300"
            />
        </div>
    );
};


export default ImportFile
