import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import toast from 'react-hot-toast';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { currencySymbol, doctors, token, backendUrl, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const docInfo = useMemo(() => doctors.find(doc => doc._id === docId), [doctors, docId]);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const getAvailableSlots = async () => {
    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let slotDate = new Date(today);
      slotDate.setDate(today.getDate() + i);

      let currentSlot = new Date(slotDate);
      let endSlot = new Date(slotDate);
      endSlot.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        currentSlot.setHours(now.getHours(), now.getMinutes() > 30 ? 30 : 0, 0, 0);
        if (currentSlot < now) {
          currentSlot.setMinutes(currentSlot.getMinutes() + 30);
        }
      } else {
        currentSlot.setHours(10, 0, 0, 0); // Start from 10:00 AM
      }

      const daySlots = [];
      while (currentSlot < endSlot) {
        daySlots.push({
          datetime: new Date(currentSlot),
          time: currentSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        currentSlot.setMinutes(currentSlot.getMinutes() + 30);
      }

      allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Please login");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    toast.loading("Appointment booking...");

    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, {
        docId,
        slotDate,
        slotTime
      }, {
        headers: { token }
      });

      toast.dismiss();

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error( data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) return <p className="text-center text-gray-500 mt-10">Doctor not found.</p>;

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium mt-3 text-gray-900'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>

        <div className='flex gap-3 items-center w-full overflow-x-auto mt-4'>
          {
            docSlots.length === 0
              ? <p className="text-gray-500 text-sm">No available slots found.</p>
              : docSlots.map((item, index) => (
                <div onClick={() => setSlotIndex(index)} key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
          }
        </div>

        <div className='flex item-center gap-3 w-full overflow-x-auto mt-4'>
          {
            docSlots[slotIndex]?.map((item, index) => (
              <p onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
                key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        <button onClick={() => { bookAppointment(); scrollTo(0, 0) }} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:scale-105 transition-all'>Book an appointment</button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
