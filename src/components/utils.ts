// Utility functions for the note editor

export const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const generateMockTitle = (content: string): string => {
  const cleanContent = stripHtmlTags(content);
  const words = cleanContent.split(' ').slice(0, 5);
  return words.join(' ') + '...';
};
