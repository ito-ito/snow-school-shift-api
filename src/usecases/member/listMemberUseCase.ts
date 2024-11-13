import { Member } from "@/entities/member";
import { MemberRepository } from "@/repositories/memberRepository";

export class ListMemberUseCase {
  static execute(): Member[] {
    const memberRepository = new MemberRepository();
    return memberRepository.list();
  }
}
