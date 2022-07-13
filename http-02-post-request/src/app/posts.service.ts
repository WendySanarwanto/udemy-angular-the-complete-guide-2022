import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, tap } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  apiUrl: string = 'https://ng-complete-guide-4618c-default-rtdb.asia-southeast1.firebasedatabase.app';

  constructor(private http: HttpClient) { }

  async createPost(post: Post){
    // Send POST Http request
    console.log(post);
    const observableResponse = 
      this.http.post<{ name: string }>(`${this.apiUrl}/posts.json`, post, {
        observe: 'response'
      });
    const response = await lastValueFrom(observableResponse);
    console.log(response); 
  }

  async fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    const mappedResult = this.http
      .get<{[key: string]:Post}>(`${this.apiUrl}/posts.json`, {
        headers: new HttpHeaders({
          'Custom-Header':'Hello'
        }),
        params: searchParams,
        responseType: 'json'
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        })
      )
    const posts: Post[] = await lastValueFrom(mappedResult);
    console.log(posts);
    return posts;
  }

  async removeAllPosts(loadedPosts: Post[]) {
    const deleteObservableResponse = this.http.delete(`${this.apiUrl}/posts.json`, {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
    const deleteResponse = await lastValueFrom(deleteObservableResponse);
    console.log(deleteResponse);

    // for(let post in loadedPosts) {
    //   const deleteResponse = await lastValueFrom(this.http.delete(`${this.apiUrl}/posts.json`, {body: post}));
    //   console.log(deleteResponse);
    // }
  }  
}
