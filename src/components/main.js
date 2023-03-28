import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import PopFunc from './pop';

// import Autocomplete from "react-google-autocomplete";

const baseUrl = ''

const Main = () => {

  const [loc, setLoc] = useState('');
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const [current, setCurrent] = useState();
  const [click, setClick] = useState();

  const lowLoc = loc.toLowerCase();
  const handleCity = async() =>{
    setLoad(true);
    try {
      const res = await axios.get(`${baseUrl}/hotel/${lowLoc}`);
      (res.data.not) && toast.error('city not found in list!');
      setData(res.data.data)
      setLoad(false);
    } catch (error) {
      console.log(error.message)
      setLoad(false);
    }
  };

  const handlePop = (ele) => {
    setCurrent(ele);
    setClick(true);
  }

  return (
    <div className=' w-full'>
      <ToastContainer />
        
        {/* <Autocomplete
        className=' m-2 h-[40px] w-[80%] bg-slate-100 rounded-md p-4 text-black'
        placeholder='Enter location'
        apiKey='AIzaSyCLGEKck5csa1CLuY5Mnu0Rb9EYm1d2DmU'
        onPlaceSelected={(place) => {
            console.log(place);
        }}
        /> */}
        <input type='text' className=' m-2 h-[40px] w-[80%] bg-slate-100 rounded-md p-4 text-black' onChange={(e) => setLoc(e.target.value)} placeholder='Enter city name' />
        <button className=' h-[40px] w-[80%] bg-black rounded-md p-4 text-white' onClick={() => handleCity() }>Get Hotels</button>
        <div className=' m-4'>
          {
            load ?
            <p>loading...</p>
            :
            <>
              {
                data?.map((ele) =>(
                  <button className=' m-2 w-[80%] bg-slate-50 rounded-lg shadow-xl' key={ele._id} onClick={() => handlePop(ele) }>{ele.name}</button>
                ))
              }
            </>
          }
        </div>
        <div>
          
          {
            click && 
            <div className=' flex flex-col text-white fixed top-0 right-0 left-0 bottom-0  pt-5 opacity-90 bg-black'>
                <div>
                  <button onClick={() => setClick(false) } className=' float-right m-2 text-3xl text-white font-bold'>X</button>
                </div><br />
                <div>
                  <h2 className=' font-bold text-lg'>Hotel Details</h2><br />
                  <center><img alt='hotel_image' className='h-[200px] w-[200px] rounded-lg' src={current.image_url} /></center>
                  <p>Name: {current.name}</p>
                  <p>City: {current.city}</p>
                  <p>Price Range: {current.price_range}</p>
                  <p>Address: {current.address}</p>
                  <p>Contact: {current.contact}</p>
                </div>
            </div>
          }
        </div>
    </div>
  )
}

export default Main