import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddFriendController } from './friend/features/add-friend/AddFriend.controller';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [FriendModule],
  controllers: [AppController, AddFriendController],
  providers: [AppService],
})
export class AppModule {}
