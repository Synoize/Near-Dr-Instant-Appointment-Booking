import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios';
import toast from 'react-hot-toast';

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, getUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    toast.loading("Profile updating...");
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } });

      toast.dismiss();

      if (data.success) {
        toast.success(data.message);
        await getUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error(error.response?.data?.message || error.message);
    }
  };


  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (line, value) => {
    setUserData(prev => ({
      ...prev,
      address: { ...prev.address, [line]: value }
    }));
  };

  return userData && (
    <div className="p-4 sm:p-8 max-w-xl  text-base font-sans text-zinc-800">
      <div className="flex flex-col items-start gap-4 mb-2">

        {
          isEdit
            ? <label htmlFor="image" className=''>
              <div className='inline-block relative cursor-pointer'>
                <img className="w-32 h-32 rounded-full object-cover" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                <img className="w-10 absolute right-11 bottom-11 rounded-full object-cover" src={image ? '' : assets.upload_icon} alt="" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
            : <img src={userData.image} alt="profile" className="w-32 h-32 rounded-full object-cover" />
        }


        {isEdit ? (
          <input
            type="text"
            className="border border-zinc-300 p-2 rounded w-full text-xl "
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <h2 className="text-2xl font-semibold">{userData.name}</h2>
        )}
      </div>

      <hr className="mb-8" />

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase mb-2 ">Contact Information</h3>

        <p className="mb-1 text-sm text-zinc-700"><strong>Email:</strong></p>
        <p className="mb-2 text-primary">{userData.email}</p>

        <p className="mb-1 text-sm text-zinc-700"><strong>Phone:</strong></p>
        {isEdit ? (
          <input
            type="text"
            className="border border-zinc-300 p-2 rounded w-full mb-2"
            value={userData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        ) : (
          <p className="mb-2 text-primary">{userData.phone}</p>
        )}

        <p className="mb-1 text-sm text-zinc-700"><strong>Address:</strong></p>
        {isEdit ? (
          <div className="flex flex-col gap-2 mb-2">
            <input
              type="text"
              className="border border-zinc-300 p-2 rounded w-full"
              value={userData.address.line1}
              onChange={(e) => handleAddressChange("line1", e.target.value)}
            />
            <input
              type="text"
              className="border border-zinc-300 p-2 rounded w-full"
              value={userData.address.line2}
              onChange={(e) => handleAddressChange("line2", e.target.value)}
            />
          </div>
        ) : (
          <p className="mb-2">
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
        )}
      </div>

      {/* Basic Info */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase mb-2">Basic Information</h3>

        <p className="mb-1 text-sm text-zinc-700"><strong>Gender:</strong></p>
        {isEdit ? (
          <select
            className="border border-zinc-300 p-2 rounded w-full mb-2"
            value={userData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <p className="mb-2">{userData.gender}</p>
        )}

        <p className="mb-1 text-sm text-zinc-700"><strong>Birthday:</strong></p>
        {isEdit ? (
          <input
            type="date"
            className="border border-zinc-300 p-2 rounded w-full mb-2"
            value={userData.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
          />
        ) : (
          <p className="mb-2">{userData.dob}</p>
        )}
      </div>

      {/* Edit Button */}
      <div className="flex justify-start">
        {
          isEdit
            ? <button
              className="px-8 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
            : <button
              className="px-8 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => { setIsEdit(true); scrollTo(0, 0) }}
            >
              Edit
            </button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
