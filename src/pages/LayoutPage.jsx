import React, { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import { RotatingSquare } from "react-loader-spinner";
import logo from "../assets/NR.svg";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function LayoutPage({ children }) {
  const { loading } = useContext(GlobalContext);
  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
          className="items-center justify-center flex "
        >
          <RotatingSquare
            visible={true}
            height="100"
            width="100"
            color="#111827"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        children
      )}

      <div className="h-20 p-4 flex justify-between items-center gap-2 bg-white">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
          <p className="text-2xl font-medium">Nikhil Ramesh</p>
        </div>
        <div className="flex items-center text-gray-900 gap-4">
          <a
            href={"https://www.linkedin.com/in/nikhil-rameshh"}
            target="_blank"
          >
            <FaLinkedin size={24} />
          </a>
          <a href={"https://github.com/NikkkhilRam"} target="_blank">
            <FaGithub size={24} />
          </a>
          <a href={"https://twitter.com/nikkkkkkil"} target="_blank">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LayoutPage;
