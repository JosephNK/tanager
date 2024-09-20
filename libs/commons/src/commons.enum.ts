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

export function getPlatformEnum(value: string) {
  value = value.toUpperCase();
  if (Object.values(Platform).includes(value as Platform)) {
    return value as Platform;
  }
  return Platform.NONE;
}
