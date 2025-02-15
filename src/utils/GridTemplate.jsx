// THIS JUST AN EXAMPLE OF A RANDOMIZED GRID GALLERY
// WE NEED A PROPER IMPLEMENTATION FOR OUR CASE
// BUT THIS IS THE RIGHT APROACH
// BELOW IS THE VERSION WITH THE API

// import React, { useEffect, useState, useRef } from "react";

// const GridTemplate = () => {
//   const [imageGroups, setImageGroups] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const loaderRef = useRef(null);

//   useEffect(() => {
//     fetchImages();
//   }, [page]);

//   const fetchImages = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://your-api.com/photos?page=${page}&limit=6`
//       );
//       const data = await response.json();
//       setImageGroups((prev) => [
//         ...prev,
//         { id: page, images: data, layout: generateRandomLayout() },
//       ]);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//     setLoading(false);
//   };

//   const generateRandomLayout = () => {
//     const layouts = [
//       "grid-cols-3 grid-rows-3 gap-2",
//       "grid-cols-4 grid-rows-2 gap-3",
//       "grid-cols-2 grid-rows-4 gap-1",
//       "grid-cols-3 grid-rows-3 gap-4",
//       "grid-cols-3 grid-rows-2 gap-2",
//     ];
//     return layouts[Math.floor(Math.random() * layouts.length)];
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading) {
//           setPage((prev) => prev + 1);
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [loading]);

//   return (
//     <div className="flex flex-col items-center">
//       {imageGroups.map((group) => (
//         <div key={group.id} className={`grid ${group.layout} w-full max-w-5xl mt-10`}>
//           {group.images.map((img, index) => (
//             <div
//               key={img.id}
//               className={`p-1 ${
//                 index % 5 === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
//               }`}
//             >
//               <img
//                 src={img.url}
//                 alt="Random"
//                 className="w-full h-auto object-cover rounded-lg"
//               />
//             </div>
//           ))}
//         </div>
//       ))}
//       <div ref={loaderRef} className="h-10"></div>
//     </div>
//   );
// };

// export default GridTemplate;

// FOR TESTING ONLY
// BELOW IS THE VERSION WITH SOME TEST IMAGES
import React, { useEffect, useState, useRef } from "react";

const GridGallery = () => {
    const [imageGroups, setImageGroups] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null);
  
    const getLocalImages = () => {
      return Array.from({ length: 9 }, (_, index) => ({
        id: `${page}-${index}-${Date.now()}`,
        src: `/cat-test-1 (${index + 1}).jpg`,
      }));
    };
  
    useEffect(() => {
      fetchImages();
    }, [page]);
  
    const fetchImages = () => {
      setLoading(true);
      setTimeout(() => {
        setImageGroups((prev) => [
          ...prev,
          { id: page, images: getLocalImages(), layout: generateRandomLayout() },
        ]);
        setLoading(false);
      }, 500); 
    };
  
    const generateRandomLayout = () => {
        const layouts = [
                  "grid-cols-3 grid-rows-3 gap-1",
                  "grid-cols-4 grid-rows-2 gap-1",
                  "grid-cols-2 grid-rows-4 gap-1",
                  "grid-cols-3 grid-rows-3 gap-1",
                  "grid-cols-3 grid-rows-2 gap-1",
                ];
      return layouts[Math.floor(Math.random() * layouts.length)];
    };
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (loaderRef.current) observer.observe(loaderRef.current);
      return () => observer.disconnect();
    }, [loading]);
  
    return (
      <div className="size-container-ideal flex flex-col items-center">
        {imageGroups.map((group) => (
          <div key={group.id} className={`grid ${group.layout} w-full mt-10`}>
            {group.images.length > 0 ? (
              group.images.map((img, index) => (
                <div
                  key={img.id}
                  className={`p-1 ${
                  img.id.includes("0") ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                  }`}
                >
                  <img
                    src={img.src}
                    alt="Cat Trail"
                    className="w-3xl h-3xl object-cover"
                  />
                  <a href="http://google.com" target="_blank" className="font-switzer-semibold uppercase text-sm">@elizadoltuofficial</a>
                </div>
              ))
            ) : (
              <div className="p-1 col-span-1 row-span-1">
                <div className="w-full h-full bg-gray-300">Placeholder</div>
              </div>
            )}
          </div>
        ))}
        <div ref={loaderRef} className="h-2"></div>
      </div>
    );
  };
  
  

export default GridGallery;

