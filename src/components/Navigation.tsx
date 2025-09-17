import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Upload, Info } from 'lucide-react';

interface NavigationProps {
  currentView: 'upload' | 'features';
  onViewChange: (view: 'upload' | 'features') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SecureCode Analyzer
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={currentView === 'features' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('features')}
            className={currentView === 'features' ? 'bg-gradient-primary' : ''}
          >
            <Info className="h-4 w-4 mr-2" />
            Features
          </Button>
          
          <Button
            variant={currentView === 'upload' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('upload')}
            className={currentView === 'upload' ? 'bg-gradient-primary' : ''}
          >
            <Upload className="h-4 w-4 mr-2" />
            Analyzer
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;