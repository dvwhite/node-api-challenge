import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Component imports
import Project from './ProjectCard';
import Projects from './../components/Projects';

const MasterRouter = () => {
  return (
    <Switch>
      <Route exact path='/' component={Projects} />
      <Route exact path='/:id' render={props => <Project {...props} />} />
    </Switch>
  );
}

export default MasterRouter;
