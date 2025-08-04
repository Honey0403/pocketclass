'use client';

import { useState, useCallback } from 'react';
import {
  NoteData,
  useClientSide,
  useNoteEditor,
  useLoadingState,
  stripHtmlTags,
  capitalizeWords,
  generateMockTitle,
  NoteEditor,
  NoteDisplay,
} from '../components';

// Main component
export default function Home() {
  const isClient = useClientSide();
  const { editor, rawNote, setRawNote } = useNoteEditor(isClient);
  const { loadingState, startLoading, stopLoading } = useLoadingState();

  const [noteData, setNoteData] = useState<NoteData>({
    raw: '',
    refined: '',
    title: '',
  });

  const isButtonDisabled = !rawNote || rawNote === '<p></p>' || loadingState.isLoading;

  const handleSaveNote = useCallback(async () => {
    if (!rawNote || rawNote === '<p></p>') return;

    startLoading('saving');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setNoteData(prev => ({
        ...prev,
        raw: rawNote,
      }));

      console.log('Note saved successfully');
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      stopLoading();
    }
  }, [rawNote, startLoading, stopLoading]);

  const handleRefineNote = useCallback(async () => {
    if (!rawNote || rawNote === '<p></p>') return;

    startLoading('refining');

    try {
      // Extract plain text from HTML for API processing
      const plainTextNote = stripHtmlTags(rawNote);
      
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          note: plainTextNote, 
          action: 'refine' 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to refine note');
      }

      const data = await response.json();
      const refinedContent = data.refinedNote;

      setNoteData(prev => ({
        ...prev,
        raw: rawNote,
        refined: refinedContent,
      }));

      console.log('Note refined successfully with AI');
    } catch (error: unknown) {
      console.error('Error refining note:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to refine note: ${errorMessage}`);
    } finally {
      stopLoading();
    }
  }, [rawNote, startLoading, stopLoading]);

  const handleGenerateTitle = useCallback(async () => {
    if (!rawNote || rawNote === '<p></p>') return;

    startLoading('generating');

    try {
      // Extract plain text from HTML for API processing
      const plainTextNote = stripHtmlTags(rawNote);
      
      const response = await fetch('/api/generate-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: plainTextNote }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate title');
      }

      const data = await response.json();
      const generatedTitle = data.generatedTitle;

      setNoteData(prev => ({
        ...prev,
        raw: rawNote,
        title: generatedTitle,
      }));

      console.log('Title generated successfully with AI');
    } catch (error: unknown) {
      console.error('Error generating title:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to generate title: ${errorMessage}`);
    } finally {
      stopLoading();
    }
  }, [rawNote, startLoading, stopLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            SMART NOTE TAKING APP
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transform your thoughts into polished content with AI-powered writing assistance
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="flex items-center text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              AI Assistant Active
            </div>
            <div className="w-px h-4 bg-slate-600"></div>
            <div className="text-sm text-slate-400">Real-time Processing</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Editor Section - Takes up 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            <NoteEditor
              editor={editor}
              isClient={isClient}
              loadingState={loadingState}
              isButtonDisabled={isButtonDisabled}
              onSaveNote={handleSaveNote}
              onRefineNote={handleRefineNote}
              onGenerateTitle={handleGenerateTitle}
            />
          </div>

          {/* Results Section - Takes up 1 column */}
          <div className="space-y-6">
            <NoteDisplay
              title=" Raw Content"
              content={noteData.raw}
              bgColor="bg-slate-800/50"
              placeholder="Start writing to see your content here..."
              icon="📝"
            />

            <NoteDisplay
              title=" AI Refined"
              content={noteData.refined}
              bgColor="bg-gradient-to-br from-blue-900/30 to-purple-900/30"
              placeholder="Click 'Refine with AI' to enhance your content..."
              icon="✨"
            />

            <NoteDisplay
              title=" Smart Title"
              content={noteData.title}
              bgColor="bg-gradient-to-br from-purple-900/30 to-pink-900/30"
              placeholder="Generate an intelligent title for your content..."
              icon="🎯"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
