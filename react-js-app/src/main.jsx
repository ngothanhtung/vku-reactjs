import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import SuspenseIntegration from './Lesson07/SuspenseIntegration.jsx';
import ProtectedRoutes from './Lesson07/ProtectedRoutes.jsx';
import DeclarativeRouting from './Lesson07/DeclarativeRouting.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <DeclarativeRouting /> */}
    {/* <DataRouting /> */}
    {/* <NestedRoutes /> */}
    {/* <DynamicRouting /> */}
    {/* <ProgrammaticNavigation /> */}
    {/* <ActionsForFormSubmission /> */}
    {/* <ErrorHandling /> */}
    {/* <LazyLoadingRoutes /> */}
    {/* <SuspenseIntegration /> */}
    {/* <ProtectedRoutes /> */}
  </StrictMode>,
);
