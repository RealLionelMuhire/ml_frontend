import React, { useState } from 'react';
import crypto from 'crypto-browserify';

const calculateChecksum = async (file) => {
  if (!file) {
    return "";
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target.result;
      const buffer = Buffer.from(fileData);
      const sha256 = crypto.createHash('sha256');
      sha256.update(buffer);
      const calculatedChecksum = sha256.digest('hex');
      resolve(calculatedChecksum);
    };
    reader.readAsArrayBuffer(file);
  });
};

const ChecksumCalculator = ({ label, name, setFieldValue }) => {
  const [checksum, setChecksum] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const calculatedChecksum = await calculateChecksum(selectedFile);
      setChecksum(calculatedChecksum);
      setFieldValue(name, selectedFile); // Set the file value in the form
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
        name={name}
      />
      {checksum && <p>{label} Checksum: {checksum}</p>}
    </div>
  );
};

export default ChecksumCalculator;
export { calculateChecksum };
