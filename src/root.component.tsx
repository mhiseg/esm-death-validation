import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DeathValidation from './death-validation-component';


const RootComponent: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/death/patient/validate`}>
      <Route exact path="/:patientUuid">
        <DeathValidation />
      </Route>
    </BrowserRouter>
  );
};

export default RootComponent;
