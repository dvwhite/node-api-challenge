import React from 'react';
import { Link } from 'react-router-dom';

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

/**
 * @function Project: A component displaying the data for a single project in Projects
 * @param {*} data: An object containing the data to display 
 * @returns: The JSX to render
 */
const Project = props => {
  const [actions, setActions] = useState([]);

  // Fetch a list of all projects from the API endpoint /projects
  useEffect(() => {
    const id = props.match.params.id;
    const apiURL = `http://localhost:4500/projects/${id}/actions`;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("projects:", res.data);
        setProjects(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <h2>Loading project data...</h2>
  return (
    <Link to={`/${data?.id}`}>
      <Card>
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
      </Card>
    </Link>
  );
};

export default Project;
