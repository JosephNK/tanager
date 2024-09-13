import { Inject } from '@nestjs/common';
import { FindMembersInboundPort, FindMembersInboundPortInputDto } from './notification.port';

// export class FindMembersService implements FindMembersInboundPort {
//     constructor(
//         // @Inject(FIND_MEMBERS_OUTBOUND_PORT)
//         // private readonly findMembersOutboundPort: FindMembersOutboundPort,
//     ) { }

//     async execute(
//         params: FindMembersInboundPortInputDto,
//     ): Promise<FindMembersInboundPortOutputDto> {
//         return this.findMembersOutboundPort.execute();
//     }
// }