import { RouterModule, Routes } from "@angular/router";
import { PostViewComponent } from "./post-view/post-view.component";
import { PostsListComponent } from "./posts-list/posts-list.component";

const postsRoutes: Routes = [
    {
        path: '',
        component: PostsListComponent
    },
    {
        path: ':id',
        component: PostViewComponent
    }
]

export const PostsRoutingModule = RouterModule.forChild(postsRoutes);