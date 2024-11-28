import { WorkType } from "@/entities/workType";
import { WorkTypeRepository } from "@/repositories/workTypeRepository";

export class ListWorkTypeUseCase {
  static execute(): WorkType[] {
    const workTypeRepository = new WorkTypeRepository();
    return workTypeRepository.list();
  }
}
