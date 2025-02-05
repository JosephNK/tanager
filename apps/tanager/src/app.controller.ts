import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ContentTypeApplicationJsonGuard,
  FailedCommonResponse,
  FindTokenInputPortDto,
  FindTokenOutputPortDto,
  RegisterInputPortDto,
  RegisterOutputPortDto,
  SendMessageInputPortDto,
  SendMessageOutputPortDto,
  SendPort,
  TokenPort,
  UnregisterInputPortDto,
  UnregisterOutputPortDto,
  SuccessRegisterResponse,
  SuccessUnregisterResponse,
  SuccessFindTokenResponse,
  SuccessSendMessageResponse,
} from '@app/commons';
import { AppService } from './app.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Tanager API')
export class AppController implements TokenPort, SendPort {
  constructor(private readonly appService: AppService) {}

  // RESTful

  @Get('test')
  test(): Promise<String> {
    console.log('app register');
    return this.appService.test();
  }

  @ApiOperation({ summary: 'Token 등록 API', description: 'Token을 등록' })
  @ApiBody({ type: RegisterInputPortDto })
  @ApiOkResponse({
    description: 'Success Response',
    type: SuccessRegisterResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: FailedCommonResponse,
  })
  @Post('register')
  @UseGuards(ContentTypeApplicationJsonGuard)
  register(@Body() dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    console.log('app register');
    return this.appService.register(dto);
  }

  @ApiOperation({ summary: 'Token 해지 API', description: 'Token을 해지' })
  @ApiBody({ type: UnregisterInputPortDto })
  @ApiOkResponse({
    description: 'Success Response',
    type: SuccessUnregisterResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: FailedCommonResponse,
  })
  @Post('unregister')
  @UseGuards(ContentTypeApplicationJsonGuard)
  unregister(
    @Body() dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto[]> {
    return this.appService.unregister(dto);
  }

  @ApiOperation({
    summary: 'Token 리스트 API',
    description: 'Token을 리스트 가져오기',
  })
  @ApiOkResponse({
    description: 'Success Response',
    type: SuccessFindTokenResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: FailedCommonResponse,
  })
  @Get('findTokenAll')
  @UseGuards(ContentTypeApplicationJsonGuard)
  findTokenAll(
    @Query() dto: FindTokenInputPortDto,
  ): Promise<FindTokenOutputPortDto[]> {
    return this.appService.findTokenAll(dto);
  }

  @ApiOperation({
    summary: 'Message Send API',
    description: '메세지 보내기',
  })
  @ApiBody({ type: SendMessageInputPortDto })
  @ApiOkResponse({
    description: 'Success Response',
    type: SuccessSendMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: FailedCommonResponse,
  })
  @Post('sendMessage')
  @UseGuards(ContentTypeApplicationJsonGuard)
  sendMessage(
    @Body() dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto[]> {
    return this.appService.sendMessage(dto);
  }
}
