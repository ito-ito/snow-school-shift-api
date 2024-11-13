import { ListShiftScheduleUseCase } from "@/usecases/shiftSchedule/listShiftSchedule";

export class AppController {
  private pathInfo: string;
  private params: {
    [key: string]: string[];
  };

  constructor(e: GoogleAppsScript.Events.DoGet) {
    this.pathInfo = e.pathInfo;
    this.params = e.parameters;
  }

  public execute() {
    if (this.pathInfo) throw new URIError("Not Found");
    if (!this.params["page"]) throw new URIError("Not Found");

    switch (this.params["page"][0]) {
      case "shift":
        return this.shiftPage();
      default:
        throw new URIError("Not Found");
    }
  }

  private shiftPage() {
    return ListShiftScheduleUseCase.execute();
  }
}
