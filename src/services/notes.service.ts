import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class NotesService {
  private async runAppleScript(script: string): Promise<string> {
    try {
      const { stdout } = await execAsync(`osascript -e '${script}'`);
      return stdout.trim();
    } catch (error) {
      throw new Error(`AppleScript execution failed: ${error.message}`);
    }
  }

  async searchNotes(query: string): Promise<string[]> {
    const script = `
      tell application "Notes"
        set searchResults to {}
        set noteList to notes whose name contains "${query}" or body contains "${query}"
        repeat with theNote in noteList
          set end of searchResults to {id:id of theNote, name:name of theNote, body:body of theNote}
        end repeat
        return searchResults
      end tell
    `;
    const result = await this.runAppleScript(script);
    return JSON.parse(result);
  }

  async createNote(title: string, body: string): Promise<string> {
    const script = `
      tell application "Notes"
        tell account "iCloud"
          make new note with properties {name:"${title}", body:"${body}"}
          return id of note 1
        end tell
      end tell
    `;
    return this.runAppleScript(script);
  }

  async readNote(id: string): Promise<any> {
    const script = `
      tell application "Notes"
        set theNote to note id "${id}"
        return {id:id of theNote, name:name of theNote, body:body of theNote}
      end tell
    `;
    const result = await this.runAppleScript(script);
    return JSON.parse(result);
  }
}