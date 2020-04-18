import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const apiURL = "http://localhost:4500:/projects";
    axios
      .get(apiURL)
      .then((res) => {
        console.log("projects:", res.data);
        setProjects(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!projects) return <h1>Loading...</h1>

  return (
    <>
      <h1>All Projects</h1>
      {projects?.map((project) => (
        <Project data={project} />
      ))}
    </>
  );
};

export default Projects;
