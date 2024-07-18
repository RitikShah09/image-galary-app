import "remixicon/fonts/remixicon.css";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { toast } from "react-toastify";
import Loader from "./components/Loader";


// Interface for Unsplash image data
interface UnsplashImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}


// State hooks for pagination, image data, selected image, and loading status
export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<UnsplashImage[]>([]);
  const [pic, setPic] = useState<UnsplashImage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  // Function to fetch images from Unsplash API
  const GetImages = async () => {
    let url = `https://api.unsplash.com/photos?page=${page}&per_page=25&client_id=Z36bXeUeFRMopOwsbyS7WAVYog_7OP1D7-TjJp2HwE8`;
    try {
      const res = await fetch(url, {
        method: "GET",
      });

      const jsonData: UnsplashImage[] = await res.json(); // Parse response as JSON
      setData((prev) => [...prev, ...jsonData]); // Append new images to existing data
      setLoading(false); // Set loading to false
    } catch (error) {
      setLoading(false); // Set loading to false in case of error
      toast.error(String(error)); // Show error notification
    }
  };


  // Fetch images when the page state changes
  useEffect(() => {
    GetImages();
  }, [page]);


  // Function to handle infinite scroll
  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1); // Increment page number
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <div className="w-screen h-screen bg-gray-900">
      {pic && (
        <div
          className="h-screen w-screen fixed flex justify-center items-center bg-black bg-opacity-[0.7]"
          onClick={() => {
            setPic(null);
          }}
        >
          <div
            className="relative sm:p-10 sm:px-20 bg-slate-300 bg-opacity-[0.9] rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex justify-between items-center pb-3 sm:pt-0 pt-3 px-2 sm:px-0">
              <a
                href={`https://unsplash.com/photos/${pic.id}/download?client_id=Z36bXeUeFRMopOwsbyS7WAVYog_7OP1D7-TjJp2HwE8`}
                className="bg-gray-600 py-2 px-3 rounded-md text-xl font-semibold text-white"
              >
                Download
              </a>
              <i
                className="ri-close-large-line text-3xl cursor-pointer text-black"
                onClick={() => {
                  setPic(null);
                }}
              ></i>
            </div>
            <img
              src={pic.urls.small}
              className="h-fit w-fit object-cover cursor-pointer"
              alt={pic.alt_description}
            />
          </div>
        </div>
      )}
      <div className="bg-gray-900 p-5">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {data.map((image, i) => (
              <img
                key={i}
                src={image.urls.small}
                style={{
                  width: "100%",
                  display: "block",
                  cursor: "pointer",
                }}
                alt={image.alt_description}
                onClick={() => {
                  setPic(image);
                }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
        {loading && <Loader />}
      </div>
    </div>
  );
}
