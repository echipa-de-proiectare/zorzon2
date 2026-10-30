import useFetchApi from "./useFetchApi";

const useFetchProjectsSpotlight = () => {
  const { loading, error, data } = useFetchApi(
    "/api/projects/projects-spotlight"
  );
  return { loading, error, projects: data };
};

const useFetchProjectsPrev = () => {
  const { loading, error, data } = useFetchApi(
    "/api/projects/projects-preview"
  );
  return { loading, error, projects: data };
};

const useFetchProjectById = (id) => {
  const { loading, error, notFound, data } = useFetchApi(
    `/api/projects/${encodeURIComponent(id)}`
  );
  return { loading, error, notFound, project: data };
};

export { useFetchProjectsSpotlight, useFetchProjectsPrev, useFetchProjectById };
