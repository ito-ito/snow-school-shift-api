export type ShiftEntityPayload = {
  dateString: string;
  details: ShiftDetailEntityPayload[];
};

type ShiftDetailEntityPayload = {
  memberName: string;
  workTypeLabel: string;
};

export class Shift {
  public readonly date: Date;
  public readonly details: ShiftDetail[];

  constructor(payload: ShiftEntityPayload) {
    this.date = new Date(payload.dateString);
    this.details = payload.details.map((detail) => new ShiftDetail(detail));
  }
}

class ShiftDetail {
  public readonly memberName: string;
  public readonly workTypeLabel: string;

  constructor(payload: ShiftDetailEntityPayload) {
    this.memberName = payload.memberName;
    this.workTypeLabel = payload.workTypeLabel;
  }
}
