// Update this page (the content is just a fallback if you fail to update the page)

import React, { useState } from 'react';
import CodeUpload from '@/components/CodeUpload';
import Features from '@/components/Features';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [currentView, setCurrentView] = useState<'upload' | 'features'>('features');

  return (
    <div className="min-h-screen">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <div className="pt-20">
        {currentView === 'features' ? <Features /> : <CodeUpload />}
      </div>
    </div>
  );
};

export default Index;
