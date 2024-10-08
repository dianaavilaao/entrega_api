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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }
}
