import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { format } from 'date-fns'


@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  checkHealth(): any {
    return {status: "Success!"};
  }

  @Get('version')
  getVersion(): any {
    const version =  this.appService.getVersion();

    return {version: version}
  }

  @ApiResponse({ 
    status: 200,
    schema: {
      example: {
        "date": "2020/12/13"
      }
    },
  })
  @Get('date')
  getDate():any {
    var date = format(new Date(), "yyyy/MM/dd");
    return { date };
  }
}
