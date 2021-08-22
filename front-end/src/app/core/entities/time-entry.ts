
export class TimeEntry
{
  id: number;
  projectId: string;
  storyId: string;
  notes: string;
  hours: number;

  constructor()
  {
    this.projectId = "";
    this.storyId = "";
    this.notes = "";
    this.hours = 1;
    this.id = 0;
  }
}