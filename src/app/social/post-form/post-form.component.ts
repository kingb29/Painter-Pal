import { Component, OnInit } from '@angular/core';
import { Post, SocialfeedService } from 'src/app/_services/socialfeed.service';
import { Miniature } from 'src/app/_services/miniature-database.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {

  post: Post;
  minis: Miniature[];
  mini: Miniature;
  title: string;

  constructor(private socialFeedService: SocialfeedService) { }

  setMini(mini){
    console.log(mini);
    this.post.mini = mini;
  }

  createPost() {
    this.socialFeedService.createPost(this.mini, this.title, this.post);
  }

  ngOnInit() {}

}
