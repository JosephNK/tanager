export enum TokenStatus {
  ISSUED = 'ISSUED', // 발급됨
  VAILD = 'VAILD', // 유효
  EXPIRED = 'EXPIRED', // 만료됨
  REVOKED = 'REVOKED', // 취소됨
  PENDING = 'PENDING', // 대기
  USED = 'USED', // 사용됨
  SUSPENDED = 'SUSPENDED', // 정지됨
  COMPROMISED = 'COMPROMISED', // 손상됨
}

export enum Platform {
  NONE = 'NONE',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WINDOWS = 'WINDOWS',
  MACOS = 'MACOS',
  LINUX = 'LINUX',
  WEB = 'WEB',
}

export enum Provider {
  NONE = 'NONE',
  FIREBASE = 'FIREBASE',
}

export enum MessageStatus {
  PENDING = 'PENDING', // 발송 대기 중
  SENT = 'SENT', // 발송 완료
  FAILED = 'FAILED', // 발송 실패
  DELIVERED = 'DELIVERED', // 수신자에게 전달됨
  READ = 'READ', // 메시지 읽힘
  CANCELED = 'CANCELED', // 발송 취소
}

export function getTokenStatusEnum(value: string): TokenStatus | null {
  value = value.toUpperCase();
  if (Object.values(TokenStatus).includes(value as TokenStatus)) {
    return value as TokenStatus;
  }
  return null;
}

export function getPlatformEnum(value: string): Platform {
  value = value.toUpperCase();
  if (Object.values(Platform).includes(value as Platform)) {
    return value as Platform;
  }
  return Platform.NONE;
}
