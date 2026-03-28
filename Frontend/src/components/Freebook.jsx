import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";
<file>d</file>
// ✅ Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -right-14 top-1/2 -translate-y-1/2 z-10 
      bg-white/20 backdrop-blur-md hover:bg-white/40 
      text-gray-800 dark:text-white p-3 rounded-full shadow-lg 
      border border-black  dark:border-white 
      cursor-pointer transition-all duration-300 hover:scale-110"
    >
      ❯
    </div>
  );
};

// ✅ Custom Prev Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -left-14 top-1/2 -translate-y-1/2 z-10 
      bg-white/20 backdrop-blur-md hover:bg-white/40 
      text-gray-800 dark:text-white p-3 rounded-full shadow-lg
      border border-black dark:border-white 
      cursor-pointer transition-all duration-300 hover:scale-110"
    >
      ❮
    </div>
  );
};

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const data = res.data.filter((data) => data.category === "Free");
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    // ✅ Custom arrows added
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">
            Free Offered Courses
          </h1>
          <p>
            Explore our collection of free courses designed to help you learn
            and grow. Start learning today and take the first step towards your
            goals.
          </p>
        </div>

        {/* ✅ Slider wrapped in relative for arrow positioning */}
        <div className="relative mt-6">
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Freebook;