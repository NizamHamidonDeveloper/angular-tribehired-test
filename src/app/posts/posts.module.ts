import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostsService } from '../shared/service/posts.service';
import { SharedModule } from '../shared/shared.module';
import { PostViewComponent } from './post-view/post-view.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [PostsListComponent,PostViewComponent],
  imports: [PostsRoutingModule, CommonModule, SharedModule],
  providers: [PostsService],
})
export class PostsModule {}
