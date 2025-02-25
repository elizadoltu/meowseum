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
import AnimatedButton from "../animations/StaggerAnimation";

const GridGallery = () => {
  const [imageGroups, setImageGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [layoutMode, setLayoutMode] = useState("grid");
  const [layout, setLayout] = useState("grid-cols-3 grid-rows-3 gap-1");
  const loaderRef = useRef(null);


  useEffect(() => {
    if (window.innerWidth < 640) {
      setLayoutMode("grid"); 
    }
  }, []);
  


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
        { id: page, images: getLocalImages(), layout },
      ]);
      setLoading(false);
    }, 500);
  };

  const generateLayout = () => {
    const layouts = [
      "grid-cols-3 grid-rows-3 gap-1",
      "grid-cols-4 grid-rows-2 gap-1",
      "grid-cols-2 grid-rows-4 gap-1",
      "grid-cols-3 grid-rows-2 gap-1",
      "grid-cols-2 grid-rows-3 gap-1",
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

  const toggleLayout = (mode) => {
    setLayoutMode(mode);
    setLayout(mode === "random" ? generateLayout() : "grid-cols-3 grid-rows-3 gap-1");
    setImageGroups([]);
    setPage(1);
  };

  const getItemClass = () => {
    if (layoutMode === "random") {
      const sizes = ["col-span-1 row-span-1", "col-span-2 row-span-1", "col-span-1 row-span-2"];
      return sizes[Math.floor(Math.random() * sizes.length)];
    }
    return "col-span-1 row-span-1";
  };

  return (
    <div>
      <div className="mb-4 z-50 flex justify-end right-0 font-general-semibold uppercase mobile:opacity-0 tablet:opacity-100">
        <button onClick={() => toggleLayout("random")} className="mr-4 px-4 py-2 uppercase">
          <AnimatedButton text={"random"} />
        </button>
        <button onClick={() => toggleLayout("grid")} className="px-4 py-2 uppercase">
          <AnimatedButton text={"grid"} />
        </button>
      </div>
      <div className="size-container-ideal flex flex-col items-center">
        {imageGroups.length > 0 &&
          imageGroups.map((group) => (
            <div key={group.id} className={`grid ${layoutMode === "random" ? "tablet:grid-cols-3 grid-rows-3 gap-1 mobile:grid-cols-1" : "tablet:grid-cols-3 grid-rows-3 gap-1 mobile:grid-cols-1"} mt-10`}>

              {group.images.length > 0 ? (
                group.images.map((img) => (
                  <div key={img.id} className={`p-1 ${getItemClass()}`}>
                    <img src={img.src} alt="Cat Trail" className="w-3xl h-2xl object-cover" />
                    <a
                      href="http://google.com"
                      target="_blank"
                      className="font-general-semibold uppercase text-sm"
                    >
                      @elizadoltuofficial
                    </a>
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
    </div>
  );
};

export default GridGallery;



