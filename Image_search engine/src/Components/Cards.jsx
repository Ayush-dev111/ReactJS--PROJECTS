import React from 'react'

const Cards = (props) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded overflow-hidden shadow-lg flex flex-col bg-gray-800 text-gray-200 mx-auto">
      <div className="h-48 sm:h-56 md:h-60 lg:h-64 xl:h-72 w-full">
        <img
          src={props.image}
          alt={`Image by ${props.author}`}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col justify-between">
        <div className="font-bold text-purple-400 text-lg sm:text-xl mb-2">
          <p>{`Photo by ${props.author}`}</p>
        </div>
        <div className="text-gray-300 text-sm sm:text-base space-y-1">
          <p><span className="font-semibold">Views:</span> {props.views}</p>
          <p><span className="font-semibold">Downloads:</span> {props.downloads}</p>
          <p><span className="font-semibold">Likes:</span> {props.likes}</p>
        </div>
      </div>
    </div>
  )
}

export default Cards
