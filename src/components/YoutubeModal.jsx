import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import { RotatingSquare } from "react-loader-spinner";

function YoutubeModal({ recipeName, onClose }) {
  const [loading, setLoading] = useState(false);
  const [ytData, setYoutubeData] = useState([]);

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/yt/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe: recipeName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setYoutubeData(data.videosList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching YouTube videos:", error);
        setLoading(false);
      });
  }, [recipeName]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center max-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <button
            onClick={handleCloseModal}
            className="absolute right-5 top-3 border rounded-full px-4 py-2 hover:bg-gray-900 hover:border-gray-900"
          >
            Close
          </button>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-gray-900 min-h-[400px] min-w-[400px] sm:min-w-[lg-width] sm:w-full sm:mt-0 mt-[200px] text-white  rounded-lg max-h-[500px] overflow-auto text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg relative">
          {loading ? (
            <div className="flex items-center justify-center min-h-[500px]">
              <RotatingSquare
                visible={true}
                height={50}
                width={50}
                color="#fff"
                ariaLabel="rotating-square-loading"
              />
            </div>
          ) : ytData &&  ytData.length > 0 ? (
            ytData.map((video, index) => (
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <div className="bg-gray-900 text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 hover:bg-gray-700">
                  <div className="flex items-center">
                    <div className="mr-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-600 sm:h-10 sm:w-10">
                      <img
                        src={video.thumbnail}
                        alt="thumbnail"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium">
                        {video.title}
                      </h3>
                      <p className="text-sm">{video.channelTitle}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[500px]">
              <p className="text-2xl">No videos found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default YoutubeModal;
