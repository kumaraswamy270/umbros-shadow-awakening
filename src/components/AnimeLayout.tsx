
import React, { ReactNode } from 'react';
import AnimeNavigation from './AnimeNavigation';

interface AnimeLayoutProps {
  children: ReactNode;
}

const AnimeLayout: React.FC<AnimeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-umbros-dark flex flex-col">
      <AnimeNavigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        {children}
      </main>
      <footer className="bg-umbros-dark/90 border-t border-umbros-light py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">Anime Universe</h3>
              <p className="text-sm text-gray-400">Your portal to anime content</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnimeLayout;
