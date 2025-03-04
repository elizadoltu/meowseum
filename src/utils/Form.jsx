import React, { useState, useRef } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

const Form = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    insta: '',
    xhandle: '',
    message: '',
    photo: null
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removePhoto = () => {
    setFormData({ ...formData, photo: null });
    setPhotoPreview(null);
    fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });
  
    const data = new FormData();
    data.append('name', formData.name.trim());
    data.append('insta', formData.insta.trim());
    data.append('xhandle', formData.xhandle.trim());
    data.append('message', formData.message.trim());
    if (formData.photo) {
      data.append('photo', formData.photo);
    }
  
    try {
      const response = await axios.post(
        'https://meowseum-backend-production.up.railway.app/api/submit-form',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Submission successful:', response.data);
      setStatus({ submitting: false, success: true, error: null });
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus({
        submitting: false,
        success: false,
        error:
          error.response?.data?.error || 'Something went wrong. Please try again.',
      });
    }
  };
  
  

  return (
    <div className='overflow-hidden size-container-ideal'>
      <Menu />
      <div className="p-4 min-h-screen flex flex-col justify-center tablet:w-3xl mobile:w-68 overflow-hidden">
        <h2 className="mb-4 uppercase font-general-semibold tablet:text-2xl">
            Complete the form
          </h2>
          <p className='font-general-regular tablet:text-base mobile:text-sm uppercase'>&#40; for the instagram and x handle, only the username, without the @ &#41;</p>
          <p className='text-base uppercase'>Only the name and the photo are required</p>
        <form onSubmit={handleSubmit} className="font-general-regular overflow-hidden mt-10">
          
          {status.success && (
            <div className="mt-4 p-2 rounded bg-green-100 text-green-800">
              Thank you for your submission! Redirecting to homepage...
            </div>
          )}
          
          {status.error && (
            <div className="mt-4 rounded bg-red-100 text-red-800">
              {status.error}
            </div>
          )}
          
          {!status.success && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                  className="w-full py-2 border-b"
                  disabled={status.submitting}
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  name="insta"
                  value={formData.insta}
                  onChange={handleInputChange}
                  placeholder="Instagram Handle"
                  className="w-full py-2 border-b"
                  disabled={status.submitting}
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  name="xhandle"
                  value={formData.xhandle}
                  onChange={handleInputChange}
                  placeholder="X Handle"
                  className="w-full py-2 border-b"
                  disabled={status.submitting}
                />
              </div>
              
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows="4"
                  className="w-full py-2 border-b resize-none"
                  disabled={status.submitting}
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  disabled={status.submitting}
                />
                
                {photoPreview ? (
                  <div className="mt-2 space-y-2">
                    <div className="relative w-full h-48 overflow-hidden rounded bg-gray-100">
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 truncate">
                        {formData.photo?.name}
                      </span>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="text-red-500 hover:text-red-700 text-sm"
                        disabled={status.submitting}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={triggerFileInput}
                    className="w-full py-2 border-b flex items-center justify-between cursor-pointer"
                    role="button"
                    tabIndex="0"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        triggerFileInput();
                      }
                    }}
                  >
                    <span className="text-gray-500">Upload Photo</span>
                    <svg 
                      className="h-5 w-5 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={status.submitting}
                className="p-2 mt-5 bg-[#181818] text-[#f6f6f6] w-full rounded-lg transition-all duration-300 ease-in-out hover:bg-[#333333] disabled:opacity-50"
              >
                {status.submitting ? "Processing..." : "Submit"}
              </button>
              
              <div className="flex justify-between mt-2 font-general-regular">
                <p>All rights reserved. 2025</p>
                <p className="underline font-general-semibold">
                  by Raul & Eliza
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    
    </div>
  );
};

export default Form;