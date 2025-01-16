import React from 'react'
import HotelCardItem from './HotelCardItem'
import { Link } from 'react-router-dom'

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl my-7'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.hotelName + " " + hotel?.hotelAddress} target='_blank'>
           {/* <HotelCardItem item={item} /> */}
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img src="/road-trip-vocation.jpg" className='rounded-xl h-[180px] w-full object-cover' />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='font-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                <h2 className='font-medium'>💰 {hotel?.price}</h2>
                <h2 className='font-medium'>⭐ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels