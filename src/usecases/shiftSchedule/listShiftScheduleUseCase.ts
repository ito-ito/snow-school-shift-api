import { Member } from "@/entities";
import { ListMemberUseCase, ListShiftUseCase, ListWorkTypeUseCase } from "@/usecases";

type ShiftSchedule = {
  id: string;
  date: Date;
  details: {
    category: string;
    roles: {
      role: string;
      members: Member[];
    }[];
  }[];
};

export class ListShiftScheduleUseCase {
  static execute(): ShiftSchedule[] {
    const listMembers = ListMemberUseCase.execute();
    const listShifts = ListShiftUseCase.execute();
    const listWorkTypes = ListWorkTypeUseCase.execute();

    return listShifts.map((shift) => {
      const detailsByCategory = Object.groupBy(shift.details, (detail) => {
        const workType = listWorkTypes.find((wt) => wt.label === detail.workTypeLabel);
        return workType?.category ?? "unknown";
      });

      const details = Object.entries(detailsByCategory)
        .filter(([category]) => category !== "unknown")
        .map(([category, categoryDetails]) => {
          const roles = Object.entries(
            Object.groupBy(categoryDetails, (detail) => {
              const workType = listWorkTypes.find((wt) => wt.label === detail.workTypeLabel);
              return workType?.role ?? "unknown";
            })
          )
            .filter(([role]) => role !== "unknown")
            .map(([role, roleDetails]) => ({
              role,
              members: roleDetails
                .map((detail) => listMembers.find((m) => m.name === detail.memberName))
                .filter((m) => m !== undefined),
            }));

          console.log(roles);
          return {
            category: category,
            roles,
          };
        });

      return {
        id: shift.id,
        date: shift.date,
        details,
      };
    });
  }
}
