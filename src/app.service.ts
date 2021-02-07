import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getVersion(): string {
    return 'CyberAid API v1.0';
  }
}
