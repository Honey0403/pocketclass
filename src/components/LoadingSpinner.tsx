// Loading spinner component

import React from 'react';
import { ActionType } from './types';

interface LoadingSpinnerProps {
  actionType: ActionType;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ actionType }) => (
  <div className="inline-flex items-center">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
    <span className="ml-2 text-sm text-gray-600">
      {actionType === 'saving' && 'Saving...'}
      {actionType === 'refining' && 'Refining...'}
      {actionType === 'generating' && 'Generating...'}
    </span>
  </div>
);
