//For Star Ratings

import { AiFillStar, AiOutlineStar } from "react-icons/ai"; //5 star rating icon
import React from 'react';

const Rating = ({ rating, onClick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (    //...Array(5) =empty array of five values,"i" bcz we want 
        <span key={i} onClick={() => onClick(i)} style={style}> 
        {/* // we need key bcz we are mapping(map) */}
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
