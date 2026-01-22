import React from 'react'
import { useDropzone } from 'react-dropzone'
import {useFileContext} from '../context/FileContext'
import { useUIContext } from '../context/UIContext';


const Upload = () => {

    const {upload, loading, progress} = useFileContext();
    const {showToast} = useUIContext();

    const onDrop = async (acceptedFiles)=>{
        // Call uploadFile function from context here
        const formData = new FormData();
        formData.append('file',acceptedFiles[0]);
        try{
            await upload(formData);
            showToast("success", "File uploaded success")
        }catch(err){
            showToast("error", "File uploading failed")
            console.error(err);
        }
        
    }

    const dropzone = useDropzone({onDrop});
  
    
    
  return (
    <div>
        <div {...dropzone.getRootProps()} className='w-3/5 h-40 border-4 border-dashed border-blue-600 rounded-md flex justify-center items-center cursor-pointer'>
            <input {...dropzone.getInputProps()} />
            <p className='text-gray-600'>Drag and drop files here, or click to select files</p>
        </div>

        {/* Progress Bar Container */}
      {loading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  )
}

export default Upload
