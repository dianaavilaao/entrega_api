import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Post } from 'src/app/models/post';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts from the API via GET', () => {
    const dummyPosts: Post[] = [
      { userId: 1, id: 1, title: 'Test Post 1', body: 'This is a test post body 1' },
      { userId: 1, id: 2, title: 'Test Post 2', body: 'This is a test post body 2' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const request = httpMock.expectOne(`${service['baseURL']}/posts`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });
});
