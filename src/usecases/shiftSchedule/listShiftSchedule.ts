import { Member } from "@/entities";
import { ListMemberUseCase, ListShiftUseCase, ListWorkTypeUseCase } from "@/usecases";

type ShiftSchedule = {
  date: Date;
  details: {
    category: string;
    role: string;
    members: Member[];
  }[];
};

export class ListShiftScheduleUseCase {
  static execute(): ShiftSchedule[] {
    const listMembers = ListMemberUseCase.execute();
    const listShifts = ListShiftUseCase.execute();
    const listWorkTypes = ListWorkTypeUseCase.execute();

    return listShifts.map((shift) => {
      return {
        date: shift.date,
        details: listWorkTypes
          .map((workType) => {
            const shiftDetails = shift.details.filter((detail) => {
              return detail.workTypeLabel === workType.label;
            });
            const members = shiftDetails
              .map((detail) => listMembers.find((member) => member.name === detail.memberName))
              .filter((member) => !!member);

            return (
              members.length && {
                category: workType.category,
                role: workType.role,
                members: members,
              }
            );
          })
          .filter((v) => !!v),
      };
    });
  }
}
