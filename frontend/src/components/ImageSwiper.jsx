import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../scss/ImageSwiper.css";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const ImageSwiper = ({
  activeImage,
  images,
  setActiveImage,
  setIsModalActive,
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && activeImage !== null) {
      swiperRef.current.slideToLoop(activeImage); // Sync Swiper with activeImage
    }
  }, [activeImage]);

  return (
    setActiveImage && (
      <Swiper
        initialSlide={activeImage}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const currentIndex = swiper.realIndex; // Get the correct index in loop mode
          setActiveImage(() => currentIndex); // Use functional update
        }}
        loop={images.length > 1 ? true : false}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={30}
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide
            key={image.id}
            style={{
              outline: "none", // Disable focus outline for Swiper slides
              userSelect: "none", // Prevent accidental text/image selection
            }}
          >
            <figure className="image">
              <img
                loading="lazy"
                src={`${API_URL}${image.formats.thumbnail.url}`} // Fallback document for older browsers
                srcSet={`
                ${API_URL}${image.formats.thumbnail.url} 117w,
                ${API_URL}${image.formats.small.url} 375w,
                ${API_URL}${image.formats.medium.url} 563w,
                ${API_URL}${image.formats.large.url} 750w,
                ${API_URL}${image.url} 3000w
              `}
                sizes="
                (max-width: 768px) 375w,
                (min-width: 769px) and (max-width: 1023px) 563w,
                (min-width: 1024px) and (max-width: 1215px) 750w,
                (min-width: 1216px) and (max-width: 1407px) 1000w,
                3000px
              "
                style={{ maxHeight: "80vh", objectFit: "contain" }}
                alt={image.name || "document"}
                onClick={() => setIsModalActive(true)}
              />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
};

export default ImageSwiper;
