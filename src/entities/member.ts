export type MemberEntityPayload = {
  name: string;
  qualification: string;
  disableString: string;
  displayName: string;
};

export class Member {
  public readonly id: string;
  public readonly name: string;
  public readonly qualification: string;
  public readonly disabled: boolean;
  public readonly displayName: string;

  constructor(payload: MemberEntityPayload) {
    this.id = Utilities.getUuid();
    this.name = payload.name;
    this.qualification = payload.qualification;
    this.disabled = payload.disableString === "有効";
    this.displayName = payload.displayName;
  }
}
