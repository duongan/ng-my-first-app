import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });
  loadPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log('post data', postData);
    this.http
      .post('https://ng-my-first-app-1a1af-default-rtdb.firebaseio.com/posts.json', postData)
      .subscribe(response => {
        console.log('response', response);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onSubmit() {
    const postData = this.postForm.value as { title: string, content: string };
    this.onCreatePost(postData);
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: {} }>('https://ng-my-first-app-1a1af-default-rtdb.firebaseio.com/posts.json')
      .pipe(map((response, index: number) => {
        const postsArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({...response[key], id: key});
          }
        }
        return postsArray;
      }))
      .subscribe(posts => {
        console.log('posts', posts);
      });
  }
}
