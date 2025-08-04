// Custom hooks for the note editor application

import { useState, useEffect, useCallback } from 'react';
import { useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import { LoadingState, ActionType } from './types';

export const useClientSide = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};

export const useNoteEditor = (isClient: boolean) => {
  const [rawNote, setRawNote] = useState('');
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 p-4 rounded-lg font-mono text-sm',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-gray-300 pl-4 italic text-gray-700',
        },
      }),
    ],
    content: '<p>Start typing here...</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-gray max-w-none focus:outline-none',
        'data-placeholder': 'Start typing your note here...',
      },
    },
    onUpdate: useCallback(({ editor }: { editor: Editor }) => {
      try {
        setRawNote(editor.getHTML());
      } catch (error) {
        console.error('Error updating raw note:', error);
      }
    }, []),
  }, [isClient]);
  
  return { editor, rawNote, setRawNote };
};

export const useLoadingState = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    actionType: '',
  });
  
  const startLoading = useCallback((actionType: ActionType) => {
    setLoadingState({ isLoading: true, actionType });
  }, []);
  
  const stopLoading = useCallback(() => {
    setLoadingState({ isLoading: false, actionType: '' });
  }, []);
  
  return { loadingState, startLoading, stopLoading };
};
