// Modern note display component for showing raw, refined, and title content

import React from 'react';

interface NoteDisplayProps {
  title: string;
  content: string;
  bgColor: string;
  placeholder: string;
  icon?: string;
}

export const NoteDisplay: React.FC<NoteDisplayProps> = ({
  title,
  content,
  bgColor,
  placeholder,
  icon,
}) => {
  return (
    <div className={`${bgColor} backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group`}>
      <div className="flex items-center mb-4">
        {icon && (
          <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
        )}
        <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">
          {title}
        </h3>
      </div>
      
      <div className="relative">
        {content ? (
          <div 
            className="prose prose-invert prose-slate max-w-none text-slate-200 prose-headings:text-white prose-strong:text-white prose-em:text-slate-300"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-slate-400 italic text-sm leading-relaxed">{placeholder}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};
