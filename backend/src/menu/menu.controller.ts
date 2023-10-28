import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private service: MenuService) {}

  @Get()
  async getAll() {
    return this.service.getAll();
  }
}
