import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy{
  posts:Post[]=[];
  isLoading = false;
  private postsSub: Subscription = new Subscription;

  constructor(public postsService: PostsService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListner().subscribe((posts:Post[]) =>{
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
