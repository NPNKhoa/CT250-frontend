import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartByUser } from '@redux/thunk/cartThunk';
import { Link } from 'react-router-dom';

import { ToVietnamCurrencyFormat } from '../helpers/ConvertCurrency';

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);
  const cartItems = cart?.cartItems || [];
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch(getCartByUser(accessToken));
  }, [dispatch, accessToken]);

  return (
    <div className=''>
      <h2 className='text-2xl font-bold text-white mb-4 bg-primary sm:rounded-t-lg'>
        Giỏ hàng
      </h2>

      <div className='w-full px-5 max-h-80 overflow-y-auto no-scrollbar'>
        <div>
          {cartItems.map(item => (
            <div key={item._id} className='flex items-center sm:mb-4 mb-2'>
              <img
                // src={item.product?.productImagePath?.[0] || ''}
                src={
                  String(item.product.productImagePath?.[0]).startsWith('http')
                    ? item.product.productImagePath?.[0]
                    : `http://localhost:5000/${String(item.product.productImagePath?.[0]).replace(
                        /\\/g,
                        '/'
                      )}`
                }
                alt={item.product?.productName}
                className='w-16 mr-2'
              />
              <div className='flex-1 text-left'>
                <div className='flex flex-col gap-1'>
                  <p className='sm:text-sm text-xs font-medium'>
                    {item.product?.productName}
                  </p>
                  <p className='sm:text-sm text-xs font-medium'>
                    Số lượng: {item.quantity}
                  </p>
                </div>
              </div>
              <div className='flex justify-between items-center mt-2'>
                <div className='text-right text-xs sm:text-sm font-bold text-primary'>
                  {ToVietnamCurrencyFormat(
                    item.itemPrice *
                      ((100 - item.product.discount?.discountPercent) / 100)
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to='/cart'>
        <button className='bg-primary hover:bg-hover-primary w-full text-white font-bold mt-2 py-2 px-4 rounded'>
          Xem giỏ hàng
        </button>
      </Link>
    </div>
  );
}

export default Cart;
