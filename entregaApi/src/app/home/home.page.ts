import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  posts: Post[] = [];
  post: Post = new Post(0, 0, '', '');
  isEditMode: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.apiService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updatePost(this.post);
    } else {
      this.createPost(this.post);
    }
  }

  createPost(post: Post) {
    this.apiService.createPost(post).subscribe((newPost: Post) => {
      this.posts.push(newPost); 
      this.resetForm(); 
    });
  }

  updatePost(post: Post) {
    this.apiService.updatePost(post.id, post).subscribe((updatedPost: Post) => {
      const index = this.posts.findIndex(p => p.id === post.id);
      this.posts[index] = updatedPost; 
      this.resetForm(); 
    });
  }

  deletePost(id: number) {
    this.apiService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id); 
    });
  }

  
  editPost(post: Post) {
    this.isEditMode = true;
    this.post = { ...post }; 
  }

  resetForm() {
    this.isEditMode = false;
    this.post = new Post(0, 0, '', ''); 
  }
}
