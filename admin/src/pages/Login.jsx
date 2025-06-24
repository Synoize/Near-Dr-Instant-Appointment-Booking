import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

  const [state, setState] = useState('Doctor')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [experience, setExperience] = useState('Not Experience')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('Not Speciality')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')

  const { setToken, backendUrl } = useContext(AdminContext)
  const { setDocToken } = useContext(DoctorContext)

  // handler of login docotor or admin
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    toast.loading('Logging...')

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })

        toast.dismiss()
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login successfully')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password })

        toast.dismiss();
        if (data.success) {
          localStorage.setItem('docToken', data.token)
          setDocToken(data.token)

          toast.success('Login successfully')
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  }

  // handler of register docotor
  const docRegisterHandler = async (event) => {
    event.preventDefault();
    toast.loading('processing...')

    try {
      if (!docImg) {
        toast.dismiss()
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
      formData.append('about', about);

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      })

      const { data } = await axios.post(`${backendUrl}/api/doctor/register`, formData)
      console.log(data);

      toast.dismiss()
      if (data.success) {
        localStorage.setItem('docToken', data.token)
        setDocToken(data.token)

        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPhone('')
        setEmail('')
        setPassword('')
        setExperience('')
        setFees('')
        setSpeciality('')
        setDegree('')
        setAddress1('')
        setAddress2('')
        setAbout('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.dismiss()
      toast.error(error.response.data.message)
      console.log('Error:', error);
    }
  }

  const specialties = [
    "Allergist", "Anesthesiologist", "Andrologist", "Cardiologist", "Dentist", "Dermatologist",
    "Endocrinologist", "ENT Specialist", "Family Medicine", "Gastroenterologist", "General Physician",
    "General Surgeon", "Geriatrician", "Gynecologist", "Hematologist", "Hepatologist", "Immunologist",
    "Internal Medicine", "Neonatologist", "Nephrologist", "Neurologist", "Neurosurgeon", "Obstetrician",
    "Oncologist", "Ophthalmologist", "Orthopedic Surgeon", "Pathologist", "Pediatrician",
    "Physiotherapist", "Plastic Surgeon", "Psychiatrist", "Pulmonologist", "Radiologist",
    "Rheumatologist", "Sexologist", "Urologist"
  ].sort();


  return (
    <div>
      {
        state !== 'Register' ? (
          <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
              <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
              <div className='w-full'>
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
              </div>
              <div className='w-full'>
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
              </div>
              <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
              {
                state === 'Admin'
                  ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => { setState('Doctor') }}>Click here</span></p>
                  : <>
                    <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => { setState('Admin') }}>Click here</span></p>
                    <p>Don't have an account? <span className='text-primary underline cursor-pointer' onClick={() => { setState('Register') }}>Sign Up</span></p>
                  </>
              }
            </div>
          </form>
        ) : (
          <form onSubmit={docRegisterHandler} className='lg:m-5 w-full flex flex-col items-center'>
            <p className='text-2xl font-semibold m-auto my-4'><span className='text-primary'>Doctor </span>{state}</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll '>
              <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                  <img className='w-16 h-16 object-contain bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
                <p>Upload doctor <br /> picture</p>
              </div>

              <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2 ' type="text" placeholder='Name' required />
                  </div>

                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Phone</p>
                    <input onChange={(e) => setPhone(e.target.value)} value={phone} className='border rounded px-3 py-2 ' type="number" placeholder='Phone' required />
                  </div>

                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2 ' type="email" placeholder='Email' required />
                  </div>

                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2 ' type="password" placeholder='Password' required />
                  </div>

                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Experience</p>
                    <select onChange={(e) => setExperience(e.target.value)} value={experience} required name="" id="" className='border rounded px-3 py-2 '>
                      <option value="Not Experience">--- Select Experience ---</option>
                      <option value="1 Year">1 Year</option>
                      <option value="2 Year">2 Year</option>
                      <option value="3 Year">3 Year</option>
                      <option value="4 Year">4 Year</option>
                      <option value="5 Year">5 Year</option>
                      <option value="6 Year">6 Year</option>
                      <option value="7 Year">7 Year</option>
                      <option value="8 Year">8 Year</option>
                      <option value="9 Year">9 Year</option>
                      <option value="10 Year">10 Year</option>
                    </select>
                  </div>

                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Fees</p>
                    <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2 ' type="number" placeholder='fees' required />
                  </div>
                </div>

                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Speciality</p>
                    <select
                      onChange={(e) => setSpeciality(e.target.value)}
                      value={speciality}
                      required
                      className="border rounded px-3 py-2"
                      name="speciality"
                      id="speciality"
                    >
                      <option value="Not Speciality">--- Select Specialization ---</option>
                      {specialties.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Education</p>
                    <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2 ' type="text" placeholder='Education' required />
                  </div>

                  <div className='flex-1 flex flex-col gap-1'>
                    <p>Address</p>
                    <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2 ' type="text" placeholder='Address 1' required />
                    <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2 ' type="text" placeholder='Address 2' required />
                  </div>

                </div>
              </div>

              <div>
                <p className='mt-4 mb-2'>About</p>
                <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' name="text" placeholder='Write about doctor... #fever #fracture #specialization ' rows={5} required></textarea>
              </div>

              <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Sign Up</button>

            </div>

            <p className='my-4'>You have an account? <span className='text-primary underline cursor-pointer' onClick={() => { setState('Doctor') }}>Login</span></p>
          </form >
        )
      }


    </div>
  )
}

export default Login