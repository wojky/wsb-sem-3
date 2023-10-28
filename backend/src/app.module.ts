import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MenuController } from "./menu/menu.controller";
import { MenuService } from "./menu/menu.service";
import { AuthModule } from "./auth/auth.module";
import { UsersService } from "./users/users.service";

@Module({
  imports: [AuthModule],
  controllers: [AppController, MenuController],
  providers: [AppService, MenuService, UsersService],
})
export class AppModule {}
