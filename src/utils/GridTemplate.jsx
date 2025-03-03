import React, { useEffect, useState, useRef } from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import DynamicCursor from "./DynamicCursor";

const GridGallery = () => {
  const [imageGroups, setImageGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [layoutMode, setLayoutMode] = useState("grid");
  const [layout, setLayout] = useState("grid-cols-3 grid-rows-3 gap-1");

  useEffect(() => {
    if (window.innerWidth < 640) {
      setLayoutMode("grid"); 
    }
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://meowseum-backend-production.up.railway.app/api/submissions', {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const processedImages = data.map((submission, index) => ({
        id: `${index}-${Date.now()}`,
        src: `data:image/jpeg;base64,${submission.image}`,
        name: submission.name,
        socialHandle: getSocialHandle(submission),
      }));

      const groupedImages = [];
      for (let i = 0; i < processedImages.length; i += 9) {
        groupedImages.push({
          id: `group-${i/9}`,
          images: processedImages.slice(i, i + 9),
          layout
        });
      }

      setImageGroups(groupedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSocialHandle = (submission) => {
    if (submission.insta) {
      return { platform: 'Instagram', handle: submission.insta };
    } else if (submission.xhandle) {
      return { platform: 'X', handle: submission.xhandle };
    }
    return null;
  }

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

  const toggleLayout = (mode) => {
    setLayoutMode(mode);
    setLayout(mode === "random" ? generateLayout() : "grid-cols-3 grid-rows-3 gap-1");
    fetchImages(); 
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
        {imageGroups.map((group) => (
          <div key={group.id} className={`grid ${layoutMode === "random" ? "tablet:grid-cols-3 grid-rows-3 gap-1 mobile:grid-cols-1" : "tablet:grid-cols-3 grid-rows-3 gap-1 mobile:grid-cols-1"} mt-10`}>
            {group.images.map((img) => (
              <div key={img.id} className={`p-1 ${getItemClass()}`}>
                <img src={img.src} alt={img.name} className="w-3xl h-2xl object-cover" />
                {img.socialHandle && (
                  <a
                    href={img.socialHandle.platform === 'Instagram' 
                      ? `https://instagram.com/${img.socialHandle.handle}`
                      : `https://x.com/${img.socialHandle.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-general-semibold uppercase text-sm"
                  >
                    @{img.socialHandle.handle}
                  </a>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default GridGallery;
