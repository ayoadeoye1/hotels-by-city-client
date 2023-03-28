import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = ''

const Add = () => {

    const [image, setImage] = useState()
    const [name, setName] = useState('')
    const [price_range, setPrice_range] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')

    let formData = new FormData();

    const lowCity = city.toLowerCase();
    console.log(lowCity);
    formData.append('image', image);
    formData.append('name', name);
    formData.append('price_range', price_range)
    formData.append('city', lowCity)
    formData.append('address', address)
    formData.append('contact', contact)

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = Object.fromEntries(formData);
        console.log(data);
        const postData = async() =>{
            try {
                const res = await axios.post(`${baseUrl}/hotel`, data, { headers: { 'content-type': 'multipart/form-data'}});
                console.log(res.data)
                res && toast.success('instance added');
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        }

        postData();
    }
  return (
    <div>
        <p className=' m-2 text-red-900'>IMPORTANT!: make sure all your input are correct. double check!</p>
        <ToastContainer />
        <form onSubmit={(e) => handleSubmit(e) }>
            <input type='file' className='border-b-2 border-pink-500 w-[60%] h-10 m-4' name='image' onChange={(e) => setImage(e.target.files[0])} placeholder='select hotel image' accept='image/*' required />
            <input type='text' className='border-b-2 border-pink-500 w-[60%] h-10 m-4' name='name' onChange={(e) => setName(e.target.value)} placeholder='Hotel Name' required />
            <input type='text' className='border-b-2 border-pink-500 w-[60%] h-10 m-4' name='price_range' onChange={(e) => setPrice_range(e.target.value)} placeholder='price range with currency' required />
            <input type='text' className='border-b-2 border-pink-500 w-[60%] h-10 m-4' name='city' onChange={(e) => setCity(e.target.value)} placeholder='city' required />
            <input type='text' className='border-b-2 border-pink-500 w-[60%] h-10 m-4' name='address' onChange={(e) => setAddress(e.target.value)} placeholder='address' required />
            <input type='tel' className='border-b-2 border-pink-500 w-[60%] h-10 m-4' name='contact' onChange={(e) => setContact(e.target.value)} placeholder='contact' required />
            <input type='submit' className='cursor-pointer hover:bg-pink-300 hover:border-blue-500 border-4 border-pink-500 bg-pink-500 text-white w-[60%] rounded-2xl h-12 m-4' placeholder='submit' />
        </form>
    </div>
  )
}

export default Add