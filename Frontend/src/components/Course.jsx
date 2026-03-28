import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Arrows
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
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch books
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");

        const data = res.data.filter(
          (item) => item.category === "Paid"
        );

        console.log("BOOK DATA:", data); // 🔥 DEBUG

        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  // 🔍 SEARCH FUNCTION (FINAL FIXED)
  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.toLowerCase().trim();

    if (!query) {
      setFilteredBooks([]);
      return;
    }

    const result = book.filter((item) => {
      return (
        item.name?.toLowerCase().includes(query) ||
        item.title?.toLowerCase().includes(query) ||
        item.author?.toLowerCase().includes(query)
      );
    });

    console.log("SEARCH RESULT:", result); // 🔥 DEBUG

    setFilteredBooks(result);
  };

  // Reset when empty
  useEffect(() => {
    if (search === "") {
      setFilteredBooks([]);
    }
  }, [search]);

  // Categories
  const categories = [
    ...new Set(book.map((item) => item.type?.trim()).filter(Boolean)),
  ];

  // Slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">

        {/* TOP */}
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

        {/* 🔍 SEARCH */}
        <form
          onSubmit={handleSearch}
          className="mt-10 flex justify-center"
        >
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md w-80 dark:bg-slate-800 dark:text-white"
          />

          <button
            type="submit"
            className="ml-2 bg-pink-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>

        {/* 🔍 SEARCH RESULT */}
        {search.trim() !== "" ? (
          filteredBooks.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBooks.map((item) => (
                <Cards key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-red-500 mt-4">
              No book found
            </p>
          )
        ) : (
          // NORMAL VIEW
          categories.map((cat) => {
            const categoryBooks = book.filter(
              (item) => item.type?.trim() === cat
            );

            return (
              <div key={cat} className="mt-16">
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {cat} Books
                </h2>

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
          })
        )}

      </div>
    </>
  );
}

export default Course;