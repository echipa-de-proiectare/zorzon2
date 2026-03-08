import React, { useState, useEffect } from "react";
import LoadingIcon from "../../elements/loadingIcon";
import useFetchServices from "../hooks/useFetchServices";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface ExampleImage {
  title: string;
  imageItem: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    alternativeText?: string;
  };
}

interface ServiceItem {
  Title: string;
  Description: string;
  Content: BlocksContent;
  Price: string;
  Time: string;
  examples?: ExampleImage[];
}

interface ServicesData {
  Title: string;
  Description: string;
  ServiceItem: ServiceItem[];
}

const API_URL = import.meta.env.VITE_API_URL;

const Services: React.FC = () => {
  const { services, loading, error } = useFetchServices();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalImageIndices, setModalImageIndices] = useState<{
    [key: string]: number;
  }>({});

  // Close modal on escape key - moved before conditional returns
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Modal functions
  const openModal = (modalId: string) => {
    setActiveModal(modalId);
    setModalImageIndices((prev) => ({ ...prev, [modalId]: 0 }));
    document.documentElement.classList.add("is-clipped");
  };

  const closeModal = () => {
    setActiveModal(null);
    document.documentElement.classList.remove("is-clipped");
  };

  const nextImage = (modalId: string, totalImages: number) => {
    setModalImageIndices((prev) => ({
      ...prev,
      [modalId]: ((prev[modalId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (modalId: string, totalImages: number) => {
    setModalImageIndices((prev) => ({
      ...prev,
      [modalId]: ((prev[modalId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const setCurrentImageIndex = (modalId: string, index: number) => {
    setModalImageIndices((prev) => ({
      ...prev,
      [modalId]: index,
    }));
  };

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <LoadingIcon />;

  // Type assertion for services
  const servicesData = services as ServicesData | null;

  return (
    servicesData && (
      <div>
        <div className="section">
          <h1 className="title">{servicesData.Title}</h1>
          <h2 className="subtitle">{servicesData.Description}</h2>
        </div>
        <div className="section">
          <div className="fixed-grid has-1-cols-mobile has-1-cols-tablet">
            <div className="grid">
              {servicesData.ServiceItem &&
                servicesData.ServiceItem.map(
                  (serviceItem: ServiceItem, index: number) => {
                    const content: BlocksContent = serviceItem.Content;
                    const modalId = `modal-service-${index}`;
                    const hasExamples =
                      serviceItem.examples && serviceItem.examples.length > 0;

                    return (
                      <div className="card" key={index}>
                        <div className="card-content">
                          <p className="title">{serviceItem.Title}</p>
                          <p className="subtitle">{serviceItem.Description}</p>
                        </div>
                        <div className="card-content">
                          <div className="content">
                            <BlocksRenderer content={content} />
                          </div>
                        </div>
                        <footer className="card-footer">
                          {hasExamples && (
                            <button
                              className="js-modal-trigger card-footer-item"
                              data-target={modalId}
                              onClick={() => openModal(modalId)}
                            >
                              VEZI EXEMPLE
                            </button>
                          )}
                          <p className="card-footer-item">
                            <span>{serviceItem.Time}</span>
                          </p>
                          <p className="card-footer-item">
                            <span>{serviceItem.Price}</span>
                          </p>
                        </footer>
                      </div>
                    );
                  },
                )}
            </div>
          </div>
        </div>

        {/* Modals for each service */}
        {servicesData.ServiceItem &&
          servicesData.ServiceItem.map(
            (serviceItem: ServiceItem, index: number) => {
              const modalId = `modal-service-${index}`;
              const isActive = activeModal === modalId;
              const examples = serviceItem.examples || [];
              const currentImageIndex = modalImageIndices[modalId] || 0;
              const currentExample = examples[currentImageIndex];

              return (
                <div
                  key={modalId}
                  className={`modal ${isActive ? "is-active" : ""}`}
                >
                  <div className="modal-background" onClick={closeModal}></div>
                  <div className="modal-content">
                    <div className="box">
                      <h3 className="title is-4">
                        {serviceItem.Title} - Exemple
                      </h3>
                      {examples.length > 0 &&
                      currentExample &&
                      currentExample.imageItem ? (
                        <div className="carousel-container">
                          <div className="carousel-image-container">
                            <img
                              src={`${API_URL}${currentExample.imageItem.url}`}
                              srcSet={`
                                ${API_URL}${
                                  currentExample.imageItem.formats?.thumbnail
                                    ?.url || currentExample.imageItem.url
                                } 150w,
                                ${API_URL}${
                                  currentExample.imageItem.formats?.small
                                    ?.url || currentExample.imageItem.url
                                } 300w,
                                ${API_URL}${
                                  currentExample.imageItem.formats?.medium
                                    ?.url || currentExample.imageItem.url
                                } 600w,
                                ${API_URL}${
                                  currentExample.imageItem.formats?.large
                                    ?.url || currentExample.imageItem.url
                                } 900w,
                                ${API_URL}${currentExample.imageItem.url} 1200w
                              `}
                              sizes="
                                (max-width: 480px) 300px,
                                (max-width: 768px) 600px,
                                (max-width: 1024px) 900px,
                                1200px
                              "
                              alt={
                                currentExample.imageItem.alternativeText ||
                                currentExample.title ||
                                "Example image"
                              }
                            />
                          </div>
                          {examples.length > 1 && (
                            <>
                              <button
                                className="button is-small carousel-nav prev"
                                onClick={() =>
                                  prevImage(modalId, examples.length)
                                }
                              >
                                ‹
                              </button>
                              <button
                                className="button is-small carousel-nav next"
                                onClick={() =>
                                  nextImage(modalId, examples.length)
                                }
                              >
                                ›
                              </button>
                            </>
                          )}
                          <div className="carousel-indicators">
                            {examples.map((_, imgIndex) => (
                              <span
                                key={imgIndex}
                                className={`carousel-indicator ${
                                  imgIndex === currentImageIndex
                                    ? "is-active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setCurrentImageIndex(modalId, imgIndex)
                                }
                              />
                            ))}
                          </div>
                          {currentExample.title && (
                            <p className="has-text-centered">
                              {currentExample.title}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>
                          Nu sunt exemple disponibile pentru acest serviciu.
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={closeModal}
                  ></button>
                </div>
              );
            },
          )}
      </div>
    )
  );
};

export default Services;
