import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostListInterface } from 'src/app/model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService{
  baseURL = ' https://jsonplaceholder.typicode.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  searchProduct(category?: string): Observable<PostListInterface[]> {
    let url = this.baseURL;
    if(!!category) {
      url = url + '/category/'+category;
    }
    return this.httpClient.get<PostListInterface[]>(url);
  }

  getPostsList() : Observable<PostListInterface[]> {
    return this.httpClient.get<PostListInterface[]>(this.baseURL+'/posts');
  }

  getPostsByID(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseURL+`/posts/${id}`)
  }

}
