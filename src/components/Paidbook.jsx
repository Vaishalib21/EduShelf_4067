import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// ✅ Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute -right-14 top-1/2 -translate-y-1/2 z-10 
    bg-black/60 text-white p-2 rounded-full cursor-pointer
    dark:bg-white dark:text-black"
  >
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute -left-14 top-1/2 -translate-y-1/2 z-10 
    bg-black/60 text-white p-2 rounded-full cursor-pointer
    dark:bg-white dark:text-black"
  >
    ❮
  </div>
);

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("https://edushelf-4067.onrender.com/book");

        // ✅ Correct filter (type = Paid)
        const data = res.data.filter(
          (item) => item.type === "Paid"
        );

        console.log("PAID BOOKS:", data); // 🔍 debug

        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  // ✅ Get categories (Programming, Mystery, etc.)
  const categories = [
    ...new Set(book.map((item) => item.category).filter(Boolean)),
  ];

  // ✅ Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">

        {/* Top Section */}
        <div className="mt-28 text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you here! 📚
          </h1>

          <p className="mt-12">
            Discover books across categories. Happy Reading! 😊
          </p>

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {/* ✅ Category Sections */}
        {categories.map((cat) => {
          const categoryBooks = book.filter(
            (item) => item.category === cat
          );

          return (
            <div key={cat} className="mt-16">

              {/* Heading */}
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                {cat} Books
              </h2>

              {/* Slider */}
              <div className="relative overflow-visible">
                <Slider {...settings}>
                  {categoryBooks.map((item) => (
                    <div key={item._id} className="px-2">
                      <Cards item={item} />
                    </div>
                  ))}
                </Slider>
              </div>

            </div>
          );
        })}

      </div>
    </>
  );
}

export default Course;