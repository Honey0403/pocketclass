// Modern note editor component with sleek design and AI-powered features

import React from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import { EditorToolbar } from './EditorToolbar';
import { ActionButton } from './ActionButton';
import { LoadingState } from './types';

interface NoteEditorProps {
  editor: Editor | null;
  isClient: boolean;
  loadingState: LoadingState;
  isButtonDisabled: boolean;
  onSaveNote: () => void;
  onRefineNote: () => void;
  onGenerateTitle: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  editor,
  isClient,
  loadingState,
  isButtonDisabled,
  onSaveNote,
  onRefineNote,
  onGenerateTitle,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group">
      {/* Header with gradient accent */}
      <div className="flex items-center mb-8">
        <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4"></div>
        <h2 className="text-2xl font-bold text-white/90 group-hover:text-white transition-colors">
          AI Writing Studio
        </h2>
        <div className="ml-auto flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </div>

      {/* Modern Editor Toolbar */}
      <EditorToolbar editor={editor} />

      {/* Editor Content Area */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative border border-slate-600/50 rounded-2xl p-6 min-h-[350px] bg-slate-900/50 backdrop-blur-sm focus-within:border-purple-500/50 focus-within:shadow-lg focus-within:shadow-purple-500/10 transition-all duration-300">
          {isClient ? (
            <>
              <EditorContent
                editor={editor}
                className="prose prose-invert prose-slate max-w-none text-white prose-headings:text-white prose-strong:text-white prose-em:text-white prose-code:text-white prose-code:bg-slate-800 prose-pre:bg-slate-800 prose-blockquote:border-purple-500 prose-blockquote:text-white"
              />
              {!editor?.getHTML() && (
                <div className="absolute inset-6 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-lg font-medium mb-2">Start Your Creative Journey</p>
                    <p className="text-slate-500 text-sm">Begin typing to unlock AI-powered writing assistance</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400">Initializing AI Studio...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modern Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <ActionButton
          onClick={onSaveNote}
          disabled={isButtonDisabled}
          isLoading={loadingState.isLoading && loadingState.actionType === 'saving'}
          actionType={loadingState.actionType}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-emerald-500/25"
        >
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Content
          </>
        </ActionButton>

        <ActionButton
          onClick={onRefineNote}
          disabled={isButtonDisabled}
          isLoading={loadingState.isLoading && loadingState.actionType === 'refining'}
          actionType={loadingState.actionType}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25"
        >
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Refine with AI
          </>
        </ActionButton>

        <ActionButton
          onClick={onGenerateTitle}
          disabled={isButtonDisabled}
          isLoading={loadingState.isLoading && loadingState.actionType === 'generating'}
          actionType={loadingState.actionType}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25"
        >
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Smart Title
          </>
        </ActionButton>
      </div>

      {/* Subtle bottom accent */}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </div>
  );
};
