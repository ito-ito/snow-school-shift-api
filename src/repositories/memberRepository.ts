import { SPREADSHEET_ID } from "@/env";
import { Member, MemberEntityPayload } from "@/entities/member";

const SHEET_NAME = "メンバーマスタ";

export class MemberRepository {
  private toEntity(data: MemberEntityPayload) {
    return new Member({
      name: data.name,
      qualification: data.qualification,
      disableString: data.disableString,
      displayName: data.displayName,
    });
  }

  list(): Member[] {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return [];

    const lastRow = sheet.getLastRow();
    const detailRange = `A2:${lastRow}`;
    const datas = sheet.getRange(detailRange).getValues();

    return datas.map((data) =>
      this.toEntity({
        name: data[0],
        qualification: data[1],
        disableString: data[2],
        displayName: data[3],
      })
    );
  }
}
