import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const ImageSwiper = ({ activeImage, images, onImageChange, openModal }) => {
  const swiperRef = useRef(null);

  // Synchronize activeImage with Swiper slide
  useEffect(() => {
    if (swiperRef.current && activeImage) {
      const activeIndex = images.findIndex((img) => img.id === activeImage.id);
      if (activeIndex !== -1) {
        swiperRef.current.slideTo(activeIndex);
      }
    }
  }, [activeImage, images]);

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => {
        const currentIndex = swiper.activeIndex;
        onImageChange(images[currentIndex]); // Update active image
      }}
      navigation={true}
      spaceBetween={30}
      slidesPerView={1}
      modules={[Navigation]}
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
                (max-width: 768px) 375px,
                (min-width: 769px) and (max-width: 1023px) 563px,
                (min-width: 1024px) and (max-width: 1215px) 750px,
                (min-width: 1216px) and (max-width: 1407px) 1000px,
                3000px
              "
              alt={image.name || "document"}
              onClick={() => openModal()}
            />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
