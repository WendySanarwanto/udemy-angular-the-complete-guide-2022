import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isFetching: boolean = false;
  loadedPosts: Post[] = [];
  error: any = null;

  constructor(private postsService: PostsService) {}

  async ngOnInit() {
    try {
      await this.fetchPosts();
    } catch(err) {
      console.log(err);
      this.error = err;
    }
  }

  async onCreatePost(postData: Post) {
    this.postsService.createPost(postData);     
  }

  async onFetchPosts() {
    // Send GET Http request
    try {
      await this.fetchPosts();
    } catch(err) {
      console.log(err);
      this.error = err;
    }
  }

  async onClearPosts() {
    // Send Http request
    await this.postsService.removeAllPosts(this.loadedPosts);
    this.loadedPosts = [];
  }

  async fetchPosts() {
    this.isFetching = true;
    try {
      const posts: Post[] = await this.postsService.fetchPosts();
      this.loadedPosts = posts;
      this.error = null;
    } finally {
      this.isFetching = false;
    }
  }

  onHandleError() {
    this.error = null;
  }
}
