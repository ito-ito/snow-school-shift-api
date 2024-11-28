import { SPREADSHEET_ID } from "@/env";
import { WorkType, WorkTypeEntityPayload } from "@/entities/workType";

const SHEET_NAME = "勤務種別マスタ";

export class WorkTypeRepository {
  private toEntity(data: WorkTypeEntityPayload) {
    return new WorkType({
      label: data.label,
      category: data.category,
      role: data.role,
    });
  }

  list(): WorkType[] {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return [];

    const lastRow = sheet.getLastRow();
    const detailRange = `A2:${lastRow}`;
    const datas = sheet.getRange(detailRange).getValues();

    return datas.map((data) => this.toEntity({ label: data[0], category: data[1], role: data[2] }));
  }
}
