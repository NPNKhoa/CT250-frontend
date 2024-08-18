// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import LogoImg from "../../assets/logo.svg";
import PhoneCallbackSharpIcon from "@mui/icons-material/PhoneCallbackSharp";
import PlaceSharpIcon from "@mui/icons-material/PlaceSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NavBar from "@components/common/NavBar";
import { Link } from "react-router-dom";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="bg-white flex justify-center items-center px-5">
        <div className=""></div>
        <div className="p-3">
          <Link to="/">
            <img src={LogoImg} alt="" className="w-[60px]" />
          </Link>
        </div>
        <div className="px-5 flex flex-col items-center">
          <ul className=" flex gap-10">
            <li className="flex gap-2 items-center">
              <PhoneCallbackSharpIcon className="text-red-500 " />
              <p className="font-bold text-sm">
                HOTLINE:
                <span className="text-red-500 text-center px-2">
                  0977508430 | 0792677415
                </span>
              </p>
            </li>
            <li className="flex gap-2 items-center">
              <PlaceSharpIcon className="text-red-500" />
              <p className="font-semibold uppercase text-sm">
                Hệ thống cửa hàng
              </p>
            </li>
            <li className="flex gap-3 relative">
              <form action="#">
                <input
                  type="text"
                  className="bg-gray-200 w-[300px] rounded-lg p-1"
                  placeholder="Tìm sản phẩm..."
                />
                <button className="absolute top-1 right-2 m-0">
                  <SearchSharpIcon className="text-red-500" />
                </button>
              </form>
            </li>
          </ul>
          <hr className="mt-3 w-full text-gray-300" />
        </div>

        <div className=" flex justify-center gap-5 ">
          <div className="flex flex-col items-center justify-center text-center space-x-2 cursor-pointer ">
            <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
              <PersonSearchRoundedIcon className="text-red-500" />
            </span>
            <h3 className="font-thin text-xs uppercase mt-1">Tra cứu</h3>
          </div>

          <div
            className="flex flex-col items-center justify-center text-center space-x-2 cursor-pointer"
            onMouseEnter={handleMouseEnter}
          >
            <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
              <AccountCircleSharpIcon className="text-red-500" />
            </span>
            <h3 className="font-thin text-xs uppercase mt-1">Tài khoản</h3>
          </div>

          {isModalOpen && (
            <div
              onMouseLeave={handleMouseEnter}
              className="absolute top-11 right-20 transform -translate-x-1/2 mt-2 w-40 bg-white rounded-lg shadow-lg z-50"
            >
              <div className="mt-4 flex flex-col space-y-2 rounded-lg">
                <Link
                  to="/signup"
                  className="hover:bg-red-500 hover:text-white rounded-t-lg p-2 text-center"
                >
                  <PersonAddIcon /> Đăng ký
                </Link>
                <Link
                  to="/login"
                  className="hover:bg-red-500 hover:text-white rounded-b-lg p-2 text-center"
                >
                  <LoginIcon /> Đăng nhập
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center text-center space-x-2 relative cursor-pointer">
            <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
              <AddShoppingCartSharpIcon className="text-red-500 " />
            </span>
            <h3 className="font-thin text-xs uppercase mt-1">Giỏ hàng</h3>
            <span className="absolute -top-1 right-2 bg-red-500 rounded-full text-white p-1 w-4 h-4 flex items-center justify-center text-xs">
              0
            </span>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Header;
