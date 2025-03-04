import React, { useEffect, useState, useRef, useCallback } from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import DynamicCursor from "./DynamicCursor";
import gsap from "gsap";
import supportWebp from "./supportWebp";

const GridGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [layoutMode, setLayoutMode] = useState("grid");
  const [layout, setLayout] = useState("grid-cols-3 grid-rows-3 gap-1");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 9,
  });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const loadingRef = useRef(null);
  const [supportsWebp, setSupportsWebp] = useState(false);

  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreImages();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (window.innerWidth < 640) {
      setLayoutMode("grid");
    }
    (async () => {
      const isWebpSupported = await supportWebp();
      setSupportsWebp(isWebpSupported);
    })();

    fetchImages(1, true);
  }, []);

  useEffect(() => {
    images.forEach((img) => {
      if (img.imageRef) {
        gsap.set(img.imageRef, { scale: 1 });

        const handleMouseEnter = () => {
          gsap.to(img.imageRef, { scale: 1.1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
          gsap.to(img.imageRef, { scale: 1, duration: 0.3 });
        };

        img.imageRef.addEventListener("mouseenter", handleMouseEnter);
        img.imageRef.addEventListener("mouseleave", handleMouseLeave);

        img.handlers = {
          enter: handleMouseEnter,
          leave: handleMouseLeave,
        };
      }
    });

    return () => {
      images.forEach((img) => {
        if (img.imageRef && img.handlers) {
          img.imageRef.removeEventListener("mouseenter", img.handlers.enter);
          img.imageRef.removeEventListener("mouseleave", img.handlers.leave);
        }
      });
    };
  }, [images]);

  const fetchImages = async (page = 1, reset = false) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://meowseum-backend-production.up.railway.app/api/submissions?page=${page}&limit=${pagination.limit}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const processedImages = data.submissions.map((submission, index) => ({
        id: `${index}-${Date.now()}`,
        src: supportsWebp 
          ? `data:image/webp;base64,${submission.image}` 
          : `data:image/jpeg;base64,${submission.image}`,
        name: submission.name,
        socialHandle: getSocialHandle(submission),
      }));

      setPagination({
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        limit: data.pagination.limit,
      });

      setHasMore(data.pagination.currentPage < data.pagination.totalPages);

      if (reset) {
        setImages(processedImages);
      } else {
        setImages((prev) => [...prev, ...processedImages]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = () => {
    if (!loading && hasMore) {
      fetchImages(pagination.currentPage + 1);
    }
  };

  const getSocialHandle = (submission) => {
    if (submission.insta?.trim()) {
      return { platform: "Instagram", handle: submission.insta };
    } else if (submission.xhandle?.trim()) {
      return { platform: "X", handle: submission.xhandle };
    }
    return null; 
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

  const toggleLayout = (mode) => {
    setLayoutMode(mode);
    setLayout(
      mode === "random" ? generateLayout() : "grid-cols-3 grid-rows-3 gap-1"
    );
    fetchImages(1, true);
  };

  const getItemClass = () => {
    if (layoutMode === "random") {
      const sizes = [
        "col-span-1 row-span-1",
        "col-span-2 row-span-1",
        "col-span-1 row-span-2",
      ];
      return sizes[Math.floor(Math.random() * sizes.length)];
    }
    return "col-span-1 row-span-1";
  };

  return (
    <div>
      <div className="mb-4 z-50 flex justify-end right-0 font-general-semibold uppercase mobile:opacity-0 tablet:opacity-100">
        <button
          onClick={() => toggleLayout("random")}
          className="mr-4 px-4 py-2 uppercase"
        >
          <AnimatedButton text={"random"} />
        </button>
        <button
          onClick={() => toggleLayout("grid")}
          className="px-4 py-2 uppercase"
        >
          <AnimatedButton text={"grid"} />
        </button>
      </div>
      <div className="size-container-ideal flex flex-col items-center">
        <div
          className={`grid ${
            "tablet:grid-cols-3 grid-rows-3 gap-1 mobile:grid-cols-1"
          } mt-10`}
        >
          {images.map((img, index) => (
            <div
              key={img.id}
              className={`p-1 ${getItemClass()}`}
              ref={index === images.length - 1 ? lastImageElementRef : null}
            >
              <DynamicCursor />
              <div className="overflow-hidden aspect-square w-full">
                {img.socialHandle?.handle ? (
                  <a
                    href={
                      img.socialHandle.platform === "Instagram"
                        ? `https://instagram.com/${img.socialHandle.handle}`
                        : `https://x.com/${img.socialHandle.handle}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overflow-hidden aspect-square w-full block"
                    data-cursor={`To my ${img.socialHandle.platform} Account`}
                  >
                    <img
                      src={img.src}
                      ref={(el) => (img.imageRef = el)}
                      alt={img.name}
                      loading="lazy"
                      className="w-full h-full object-cover transform origin-center transition-transform duration-300 ease-out"
                    />
                  </a>
                ) : (
                  <div className="overflow-hidden aspect-square w-full">
                    <img
                      src={img.src}
                      ref={(el) => (img.imageRef = el)}
                      alt={img.name}
                      loading="lazy"
                      data-cursor={`Photo by ${img.name}`}
                      className="w-full h-full object-cover transform origin-center transition-transform duration-300 ease-out"
                    />
                  </div>
                )}
              </div>
              {img.socialHandle?.handle ? (
                <a
                  href={
                    img.socialHandle.platform === "Instagram"
                      ? `https://instagram.com/${img.socialHandle.handle}`
                      : `https://x.com/${img.socialHandle.handle}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-general-semibold uppercase text-sm"
                  data-cursor={`To my ${img.socialHandle.platform} Account`}
                >
                  @{img.socialHandle.handle}
                </a>
              ) : (
                <span className="font-general-semibold uppercase text-sm">
                  {img.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {loading && (
        <div ref={loadingRef} className="py-4 text-center">
          Loading more images...
        </div>
      )}
    </div>
  );
};

export default GridGallery;
