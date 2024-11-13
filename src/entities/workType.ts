export type WorkTypeEntityPayload = {
  label: string;
  category: string;
  role: string;
};

export class WorkType {
  public readonly label: string;
  public readonly category: string;
  public readonly role: string;

  constructor(payload: WorkTypeEntityPayload) {
    this.label = payload.label;
    this.category = payload.category;
    this.role = payload.role;
  }
}
