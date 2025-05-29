import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Cards from './Cards'

const ImageGenerator = () => {
    const [search, setSearch] = useState("Bike");
    const [imageData, setImageData] = useState([]);
    const [pages, setPages] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const perPage = 16;
    let fetchImages = async (query, searchPages) => {
        try {
            let response = await fetch(`https://pixabay.com/api/?key=${import.meta.env.VITE_API_KEY}&q=${query}&image_type=photo&per_page=${perPage}&page=${searchPages}`);
            let data = await response.json();
            setImageData(data.hits);
            setTotalPages(Math.ceil(data.totalHits / perPage));
            
            
        } catch (error) {
            console.error(error);
            alert("Failed to fetch images. Try again later.");
        }
    }

    useEffect(() => {
        fetchImages(search, pages);
    }, [pages])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim() === "") {
            alert("Please enter correct keyword");
            return;
        }

        setPages(1);
        fetchImages(search, 1);
        // setSearch("");
    }

    return (
        <div className="flex flex-col items-center bg-gray-900 min-h-screen text-gray-200 px-4 sm:px-6 md:px-10">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-8 mb-6 font-bold uppercase text-center text-gray-100 leading-tight">
    Image Search Engine
  </h1>

        <form
    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-2xl px-2 sm:px-0"
    onSubmit={handleSubmit}
  >
    <input
      type="text"
      className="flex-grow rounded-lg px-4 py-3 border border-gray-700 bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-auto text-base sm:text-lg"
      placeholder="Search images"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto text-base sm:text-lg cursor-pointer"
    >
      Search
    </button>
  </form>
      
        {imageData.length > 0 ? (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 my-10 w-full max-w-7xl">
        {imageData.map((data) => (
        <Cards
            key={data.id}
            image={data.webformatURL}
            views={data.views}
            downloads={data.downloads}
            likes={data.likes}
            author={data.user}
        />
        ))}
    </div>

    <div className="flex gap-4 my-10">
            <button
              onClick={() => setPages((prev) => Math.max(prev - 1, 1))}
              disabled={pages === 1}
              className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <span>Page {pages} of {totalPages}</span>
            <button
              onClick={() => setPages((prev) => Math.min(prev + 1, totalPages))}
              disabled={pages === totalPages}
              className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
    </>
) : (
  <p className="text-gray-400 text-2xl sm:text-3xl md:text-5xl mt-20 text-center">
    No images found
  </p>
)}
      </div>
      
    )
}

export default ImageGenerator
 