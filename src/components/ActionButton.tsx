// Modern action button with enhanced loading states and visual feedback

import React from 'react';
import { ActionType } from './types';

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  actionType: ActionType;
  children: React.ReactNode;
  className: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled,
  isLoading,
  actionType,
  children,
  className,
}) => {
  const getLoadingText = () => {
    switch (actionType) {
      case 'saving': return 'Saving...';
      case 'refining': return 'AI Processing...';
      case 'generating': return 'Generating...';
      default: return 'Processing...';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative ${className} text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform ${
        disabled 
          ? 'opacity-50 cursor-not-allowed scale-95' 
          : 'hover:scale-105 hover:shadow-2xl active:scale-95'
      } flex items-center justify-center min-w-[140px] overflow-hidden group`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center">
        {isLoading ? (
          <div className="flex items-center space-x-3">
            {/* Modern loading spinner */}
            <div className="relative">
              <div className="w-5 h-5 border-2 border-white/30 rounded-full"></div>
              <div className="absolute top-0 left-0 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            
            {/* Loading text with typing animation */}
            <span className="text-sm font-medium">
              {getLoadingText()}
            </span>
            
            {/* Pulsing dots */}
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 group-hover:scale-105 transition-transform duration-200">
            {children}
          </div>
        )}
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
    </button>
  );
};
