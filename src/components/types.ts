// Types and interfaces for the note editor application

export interface NoteData {
  raw: string;
  refined: string;
  title: string;
}

export type ActionType = 'saving' | 'refining' | 'generating' | '';

export interface LoadingState {
  isLoading: boolean;
  actionType: ActionType;
}
