export type ShiftEntityPayload = {
  dateString: string;
  details: ShiftDetailEntityPayload[];
};

type ShiftDetailEntityPayload = {
  memberName: string;
  workTypeLabel: string;
};

export class Shift {
  public readonly id: string;
  public readonly date: Date;
  public readonly details: ShiftDetail[];

  constructor(payload: ShiftEntityPayload) {
    this.id = Utilities.getUuid();
    this.date = new Date(payload.dateString);
    this.details = payload.details.map((detail) => new ShiftDetail(detail));
  }
}

class ShiftDetail {
  public readonly id: string;
  public readonly memberName: string;
  public readonly workTypeLabel: string;

  constructor(payload: ShiftDetailEntityPayload) {
    this.id = Utilities.getUuid();
    this.memberName = payload.memberName;
    this.workTypeLabel = payload.workTypeLabel;
  }
}
