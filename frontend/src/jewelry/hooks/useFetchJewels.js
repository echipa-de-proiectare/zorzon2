import useFetchApi from "../../main/hooks/useFetchApi";

const useFetchJewels = () => {
  const { loading, error, data } = useFetchApi("/api/jewels");
  return { loading, error, jewels: data };
};

const useFetchJewelById = (id) => {
  const { loading, error, notFound, data } = useFetchApi(
    `/api/jewels/${encodeURIComponent(id)}`
  );
  return { loading, error, notFound, jewel: data };
};

const useFetchJewelryInfo = () => {
  const { loading, error, data } = useFetchApi("/api/jewelry-info");
  return { loading, error, info: data };
};

export { useFetchJewels, useFetchJewelById, useFetchJewelryInfo };
