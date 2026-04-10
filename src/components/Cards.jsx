import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate("/payment", { state: { book: item } });
  };

  return (
    <>
      <div className="mt-4 my-3 p-1">
        <div className="card w-60 bg-base-100 shadow-lg hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border flex flex-col h-full overflow-hidden">
          
          {/* Image */}
          <figure>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-cover"
            />
          </figure>

          {/* Content */}
          <div className="card-body flex flex-col justify-between flex-grow p-2">
            
            <div>
              <h2 className="card-title text-xs">
                {item.name}
                <div className="badge badge-secondary text-[10px]">
                  {item.category}
                </div>
              </h2>

              <p className="text-[11px] mt-1">
                {item.title}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="card-actions justify-between items-center mt-3">
              
              {/* Price OR Free */}
              {item.category === "Free" ? (
                <div className="badge badge-success text-[10px]">
                  Free
                </div>
              ) : (
                <div className="badge badge-outline text-[10px]">
                  ₹{item.price}
                </div>
              )}

              {/* 🔥 Buy Button only for Paid */}
              {item.category === "Paid" && (
                <div
                  onClick={handleBuy}
                  className="cursor-pointer px-2 py-1 text-xs rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                >
                  Buy
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;