import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isJewelrySite, SITE_NAME, SITE_URL } from "../../site";

const DEFAULT_DESCRIPTION = isJewelrySite
  ? "Bijuterii artizanale lucrate manual de ZORZON, în Timișoara."
  : "Birou de arhitectura si design de interior din Timisoara, Romania.";
const DEFAULT_IMAGE = "https://zorzon.com.ro/logo1.jpg";

// Create the <meta>/<link> tag if index.html doesn't have it yet
const setTag = (tagName, key, keyValue, attribute, value) => {
  let element = document.head.querySelector(`${tagName}[${key}="${keyValue}"]`);
  if (!element) {
    element = document.createElement(tagName);
    element.setAttribute(key, keyValue);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

// Set the title, description, canonical and social tags for the current page
const usePageMeta = ({ title, description, image, noindex = false } = {}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const fullDescription = (description || DEFAULT_DESCRIPTION).slice(0, 160);
    const url = `${SITE_URL}${pathname}`;
    const imageUrl = image || DEFAULT_IMAGE;

    document.title = fullTitle;
    setTag("meta", "name", "description", "content", fullDescription);
    setTag("meta", "name", "robots", "content", noindex ? "noindex" : "index, follow");
    setTag("link", "rel", "canonical", "href", url);

    setTag("meta", "property", "og:title", "content", fullTitle);
    setTag("meta", "property", "og:description", "content", fullDescription);
    setTag("meta", "property", "og:url", "content", url);
    setTag("meta", "property", "og:image", "content", imageUrl);
    setTag("meta", "name", "twitter:title", "content", fullTitle);
    setTag("meta", "name", "twitter:description", "content", fullDescription);
    setTag("meta", "name", "twitter:image", "content", imageUrl);
  }, [title, description, image, noindex, pathname]);
};

export default usePageMeta;
