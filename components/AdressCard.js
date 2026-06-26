import React from 'react'

const AdressCard = ({ address }) => {

  if (!address) return <p>No address added yet</p>;

  return (
    <div>
      <div className='space-y-3'>
        <p className='font-semibold'>
          {address.firstName} {address.lastName}
        </p>

        <p>
          {address.streetAddress},
          {" "}
          {address.city},
          {" "}
          {address.state}
        </p>

        <div className='space-y-1'>
          <p className='font-semibold'>Phone Number</p>
          <p>{address.mobile}</p>
        </div>
      </div>
    </div>
  )
}

export default AdressCard