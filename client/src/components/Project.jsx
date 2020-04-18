import React, { useState, useEffect } from "react";
import axios from "axios";

// Styled components
import styled from "styled-components";

const Card = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2%;
  padding 1%;
  border: 1px solid darkgray;
  background: whitesmoke;
  width: 75%;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    box-shadow: 2px 4px 8px #444;
    transition: all 0.3s ease;
    & > span {
      background: coral;
      box-shadow: 2px 2px 4px #444;
      transition: all 0.4s ease;
    }
    & > button {
      background: #444;
      color: lightgray;
      box-shadow: 2px 2px 4px #444;
      transition: all 0.4s ease;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
`;

/**
 * @function Project: A component displaying the data for a single project in Projects
 * @param {*} data: An object containing the data to display
 * @returns: The JSX to render
 */
const Project = (props) => {
  const [actions, setActions] = useState([]);

  // Fetch a list of all projects from the API endpoint /projects
  useEffect(() => {
    const id = props.match.params.id;
    console.log(id);
    const apiURL = `http://localhost:4500/projects/${id}/actions`;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("actions:", res.data);
        setActions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!actions.length) return <h2>Loading project's action data...</h2>;
  return (
    <Wrapper>
      {actions?.map((action, idx) => {
        return (<Card key={idx}>
          <h2>{action?.description}</h2>
          <p>{action?.notes}</p>
        </Card>)
      })}
    </Wrapper>
  );
};

export default Project;
