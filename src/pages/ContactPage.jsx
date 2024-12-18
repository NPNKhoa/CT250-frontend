import { useEffect, useState } from 'react';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import FeedbackService from '@services/feedback.service';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '@redux/thunk/userThunk';

const ContactPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [dispatch, accessToken]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullname || '',
        email: user.email || '',
        phone: user.phone || '',
        message: '',
      });
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    setLoading(true);

    try {
      await FeedbackService.createFeedback(
        {
          senderName: name,
          senderEmail: email,
          senderPhone: phone,
          question: message,
        },
        accessToken
      );

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      toast.success('Phản hồi của bạn đã được gửi thành công!');
    } catch (err) {
      console.log(err);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Liên hệ', href: '/contact' },
  ];

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='container mx-auto p-4 flex flex-col lg:flex-row gap-3'>
        <div className='w-full lg:w-1/2'>
          <h1 className='text-2xl font-bold mb-4'>Liên hệ với chúng tôi</h1>
          <form
            onSubmit={handleSubmit}
            className='bg-white p-6 rounded-lg shadow-md'
          >
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Họ và tên
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'
              >
                Số điện thoại
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700'
              >
                Nội dung
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows='4'
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                required
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            >
              {loading ? <CircularProgress color='inherit' size={20} /> : 'Gửi'}
            </button>
          </form>
        </div>

        <div className='w-full lg:w-1/2'>
          <h2 className='text-xl font-semibold mb-4'>
            Cửa hàng của chúng tôi tại:
          </h2>
          <div className='relative w-full h-[460px]'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.744050235205!2d105.7759033!3d10.037967199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0881957406429%3A0x53028634c0f2ad8a!2zSOG6u20gOTggxJAuIFRy4bqnbiBIxrBuZyDEkOG6oW8sIEFuIE5naGnhu4dwLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1724486698826!5m2!1svi!2s'
              width='600'
              height='450'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='absolute inset-0 w-full h-full'
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
