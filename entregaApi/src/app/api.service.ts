import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'https://jsonplaceholder.typicode.com';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // GET /posts - Retrieve all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseURL}/posts`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // GET /posts/1 - Retrieve a single post by ID
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseURL}/posts/${id}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // GET /posts/1/comments - Retrieve comments of a specific post
  getPostComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/posts/${postId}/comments`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // GET /comments?postId=1 - Retrieve comments by postId
  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/comments`, { params: { postId: postId.toString() } }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // POST /posts - Create a new post
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseURL}/posts`, JSON.stringify(post), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // PUT /posts/1 - Update an existing post (replace all data)
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseURL}/posts/${id}`, JSON.stringify(post), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // PATCH /posts/1 - Partially update an existing post (replace specific fields)
  patchPost(id: number, partialData: Partial<Post>): Observable<Post> {
    return this.http.patch<Post>(`${this.baseURL}/posts/${id}`, JSON.stringify(partialData), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // DELETE /posts/1 - Delete a post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/posts/${id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Handle API errors
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return [];
  }
}