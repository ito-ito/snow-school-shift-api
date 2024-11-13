import { AppController } from "./controllers/appController";

export const doGet = (e: GoogleAppsScript.Events.DoGet) => {
  try {
    const controller = new AppController(e);
    const result = controller.execute();

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      loggerError(error);
    }
    throw error;
  }
};

const loggerError = (error: Error): void => {
  console.error(`
    [Name] ${error.name}
    [Message] ${error.message}
    [StackTrace] ${error.stack}
  `);
};
