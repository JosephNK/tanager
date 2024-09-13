export type FindMembersInboundPortInputDto = void;
export type FindMembersInboundPortOutputDto = Array<{
    id: number;
    name: string;
    notificationToken: string;
    state: string;
}>;

export const FIND_MEMBERS_INBOUND_PORT = 'FIND_MEMBERS_INBOUND_PORT' as const;
export interface FindMembersInboundPort {
    execute(
        params: FindMembersInboundPortInputDto,
    ): Promise<FindMembersInboundPortOutputDto>;
}