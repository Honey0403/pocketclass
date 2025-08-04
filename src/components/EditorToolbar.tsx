// Modern glassmorphism editor toolbar with organized button groups

import React from 'react';
import { Editor } from '@tiptap/react';

interface EditorToolbarProps {
  editor: Editor | null;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const buttonGroups = [
    {
      name: 'Format',
      buttons: [
        { action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), icon: 'B', title: 'Bold (Ctrl+B)' },
        { action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), icon: 'I', title: 'Italic (Ctrl+I)' },
        { action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), icon: 'U', title: 'Underline (Ctrl+U)' },
        { action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), icon: 'S', title: 'Strikethrough' },
      ]
    },
    {
      name: 'Headings',
      buttons: [
        { action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }), icon: 'H1', title: 'Heading 1' },
        { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), icon: 'H2', title: 'Heading 2' },
        { action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }), icon: 'H3', title: 'Heading 3' },
      ]
    },
    {
      name: 'Lists',
      buttons: [
        { action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), icon: '•', title: 'Bullet List' },
        { action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), icon: '1.', title: 'Numbered List' },
        { action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), icon: '"', title: 'Quote' },
        { action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock'), icon: '</>', title: 'Code Block' },
      ]
    },
    {
      name: 'Align',
      buttons: [
        { action: () => editor.chain().focus().setTextAlign('left').run(), active: false, icon: '←', title: 'Align Left' },
        { action: () => editor.chain().focus().setTextAlign('center').run(), active: false, icon: '↔', title: 'Align Center' },
        { action: () => editor.chain().focus().setTextAlign('right').run(), active: false, icon: '→', title: 'Align Right' },
      ]
    },
    {
      name: 'Media',
      buttons: [
        { action: () => { const url = window.prompt('Enter URL:'); if (url) editor.chain().focus().setLink({ href: url }).run(); }, active: editor.isActive('link'), icon: '🔗', title: 'Add Link' },
        { action: () => { const url = window.prompt('Enter image URL:'); if (url) editor.chain().focus().setImage({ src: url }).run(); }, active: false, icon: '🖼️', title: 'Add Image' },
      ]
    },
    {
      name: 'Actions',
      buttons: [
        { action: () => editor.chain().focus().undo().run(), active: false, icon: '↶', title: 'Undo (Ctrl+Z)' },
        { action: () => editor.chain().focus().redo().run(), active: false, icon: '↷', title: 'Redo (Ctrl+Y)' },
        { action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(), active: false, icon: '✗', title: 'Clear Format' },
      ]
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 p-4 bg-slate-900/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl">
        {buttonGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex items-center">
            {/* Group separator */}
            {groupIndex > 0 && (
              <div className="w-px h-6 bg-slate-600/50 mx-2"></div>
            )}
            
            {/* Button group */}
            <div className="flex gap-1">
              {group.buttons.map((btn, btnIndex) => (
                <button
                  key={`${groupIndex}-${btnIndex}`}
                  onClick={btn.action}
                  title={btn.title}
                  className={`relative w-9 h-9 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center group ${
                    btn.active 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-105' 
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  <span className="relative z-10">{btn.icon}</span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Keyboard shortcuts hint */}
      <div className="mt-3 px-4">
        <p className="text-xs text-slate-400 leading-relaxed">
          <span className="font-medium text-slate-300">Quick Keys:</span> 
          <span className="mx-2">•</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800/50 rounded text-xs">Ctrl+B</kbd> Bold
          <span className="mx-2">•</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800/50 rounded text-xs">Ctrl+I</kbd> Italic
          <span className="mx-2">•</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800/50 rounded text-xs">Ctrl+Z</kbd> Undo
        </p>
      </div>
    </div>
  );
};
