import React, { Suspense } from 'react';
import ObukaContent from './ObukaContent'; // Your client component

const ObukaPage = () => {
  return (
    // The Suspense boundary MUST be in a Server Component
    // wrapping a Client Component that uses the hooks.
    <Suspense fallback={<p>Loading content...</p>}>
      <ObukaContent />
    </Suspense>
  );
};

export default ObukaPage;