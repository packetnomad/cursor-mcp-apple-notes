import { NotesPlugin } from './plugins/notes.plugin';

export const mcpConfig = {
  plugins: {
    notes: new NotesPlugin(),
  },
  commands: {
    'notes.search': {
      description: 'Search Apple Notes',
      handler: async (query: string) => {
        const notes = await mcpConfig.plugins.notes.searchNotes(query);
        return {
          type: 'success',
          data: notes,
        };
      },
    },
    'notes.create': {
      description: 'Create a new Apple Note',
      handler: async ({ title, content }: { title: string; content: string }) => {
        const noteId = await mcpConfig.plugins.notes.createNote(title, content);
        return {
          type: 'success',
          data: { id: noteId },
        };
      },
    },
    'notes.read': {
      description: 'Read an Apple Note by ID',
      handler: async (id: string) => {
        const note = await mcpConfig.plugins.notes.readNote(id);
        return {
          type: 'success',
          data: note,
        };
      },
    },
  },
};