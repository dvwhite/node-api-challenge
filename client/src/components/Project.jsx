import React from 'react';

// Styled components
import styled from styled-components;



const Project = ({ data }) => {
  if (!data) return <h2>Loading project data...</h2>
  return (
    <Link to={`/${data?.id}`>
      <Card>
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
      </Card>
    </Link>
  );
};

export const Project;
