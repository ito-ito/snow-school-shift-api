import { Shift } from "@/entities/shift";
import { ShiftRepository } from "@/repositories/shiftRepository";

export class ListShiftUseCase {
  static execute(): Shift[] {
    const shiftRepository = new ShiftRepository();
    return shiftRepository.list();
  }
}
