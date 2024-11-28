import { SPREADSHEET_ID } from "@/env";
import { Shift, ShiftEntityPayload } from "@/entities/shift";

const SHEET_NAME = "シフト";

export class ShiftRepository {
  private toEntity(data: ShiftEntityPayload) {
    return new Shift({
      dateString: data.dateString,
      details: data.details,
    });
  }

  list(): Shift[] {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return [];

    const lastRow = sheet.getLastRow();
    const dateRange = "B1:1"; // 日付を取得する範囲
    const memberNameRange = `A3:A${lastRow}`;
    const shiftInputRange = `B3:${lastRow}`;
    // データ取得
    const dates = sheet.getRange(dateRange).getValues().flat();
    const staffs = sheet.getRange(memberNameRange).getValues().flat();
    const details = sheet.getRange(shiftInputRange).getValues();

    return dates.map((date, index) => {
      return this.toEntity({
        dateString: date,
        details: details.map((detail, i) => {
          return {
            memberName: staffs[i],
            workTypeLabel: detail[index],
          };
        }),
      });
    });
  }
}
