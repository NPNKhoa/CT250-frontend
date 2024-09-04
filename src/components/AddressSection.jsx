import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import AddressFormDialog from '@components/AddressFormDialog';
import {
  getUserAddressThunk,
  createAddressThunk,
} from '@redux/thunk/addressThunk';

function AddressSection() {
  const dispatch = useDispatch();
  const { addresses, loading, error } = useSelector(state => state.address);
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getUserAddressThunk(accessToken));
  }, [dispatch]);

  const handleClickOpen = () => {
    setEditAddress(null); // Reset the form for a new address
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async formData => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      await dispatch(
        createAddressThunk({ addressData: formData, accessToken })
      );
      dispatch(getUserAddressThunk(accessToken)); // Re-fetch the addresses to update the list
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <div className='mt-5'>
      <button
        className='bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4'
        onClick={handleClickOpen}
      >
        + Thêm địa chỉ mới
      </button>

      <AddressFormDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        address={editAddress}
      />

      <div className='mt-6'>
        <h2 className='text-xl font-semibold mb-4'>Danh sách địa chỉ</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div key={index} className='border-t border-gray-300 py-4'>
              <div className='flex justify-between'>
                <div>
                  <h3 className='text-lg font-semibold'>{address.fullname}</h3>
                  <p className='text-gray-600'>{address.phone}</p>
                  <p>{address.detail}</p>
                  <p>
                    {address.commune}, {address.district}, {address.province}
                  </p>
                  {address.isDefault && (
                    <span className='text-red-500 font-bold'>Mặc định</span>
                  )}
                </div>
                <div className='text-right'>
                  <button
                    className='text-blue-500 hover:underline'
                    onClick={() => handleClickOpen(index)}
                  >
                    Cập nhật
                  </button>
                  {!address.isDefault && (
                    <>
                      <button
                        className='ml-4 text-red-500 hover:underline'
                        onClick={() => handleDelete(index)}
                      >
                        Xóa
                      </button>
                      <button
                        className='block mt-2 text-gray-600 border border-gray-300 py-1 px-2 rounded'
                        onClick={() => handleSetDefault(index)}
                      >
                        Thiết lập mặc định
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Chưa có địa chỉ nào.</p>
        )}
      </div>
    </div>
  );
}

export default AddressSection;
