import { NotesService } from '../services/notes.service';

export class NotesPlugin {
  private notesService: NotesService;

  constructor() {
    this.notesService = new NotesService();
  }

  async searchNotes(query: string) {
    try {
      return await this.notesService.searchNotes(query);
    } catch (error) {
      console.error('Failed to search notes:', error);
      throw error;
    }
  }

  async createNote(title: string, content: string) {
    try {
      return await this.notesService.createNote(title, content);
    } catch (error) {
      console.error('Failed to create note:', error);
      throw error;
    }
  }

  async readNote(id: string) {
    try {
      return await this.notesService.readNote(id);
    } catch (error) {
      console.error('Failed to read note:', error);
      throw error;
    }
  }
}