import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import ProjectCard from './ProjectCard';

// Styled components
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
`;

/**
 * @function Projects: A functional component that displays all projects
 * @returns: The individual card components containing the details for each project
 */
const Projects = () => {
  const [projects, setProjects] = useState([]);

  // Fetch a list of all projects from the API endpoint /projects
  useEffect(() => {
    const apiURL = "http://localhost:4500/projects";
    axios
      .get(apiURL)
      .then((res) => {
        console.log("projects:", res.data);
        setProjects(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!projects) return <h1>Loading...</h1>;

  return (
    <Wrapper>
      <h1>All Projects</h1>
      {projects?.map((project, idx) => (
        <ProjectCard data={project} key={idx} />
      ))}
    </Wrapper>
  );
};

export default Projects;
