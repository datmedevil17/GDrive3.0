import React from "react";
import axios from "axios";
import { useState } from "react";
const FileUpload = ({ state, account }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("No image Selected");
  const { contract, provider, signer, address } = state;
  console.log(state, account);
  const retrieveFile = (e) => {
    const data = e.target.files[0];//files array of files object
    console.log(data)
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data)
    reader.onloadend=()=>{
        setFile(e.target.files[0])
    }
    setFilename(e.target.files[0].name)
    e.preventDefault();

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (file) {
      try {
        const formData = new FormData(); //this type of object is used for key value pairs
        formData.append("file", file); 
       


        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `35cb1bf7be19d2a8fa0d`,
            pinata_secret_api_key: `2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50`,
            "Content-Type": "multipart/form-data",
          },
        });
        
        console.log(resFile)
        const imgHash = `ipfs://${resFile.data.IpfsHash}`;
         contract.add(account,imgHash)
        alert("Image Uploaded Successfully")
        console.log(resFile.data.IpfsHash)
        setFilename("No image selected")
        setFile(null)
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload">Choose Image</label>
        <input
          type="file"
          id="file-upload"
          onChange={retrieveFile}
          disabled={!account}
          name="data"
        />
        <span> Image: {filename}</span>
        <button type="submit" disabled={!file}>Upload File</button>
      </form>
    </div>
  );
};

export default FileUpload;
