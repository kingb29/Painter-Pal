import { Injectable } from '@angular/core';
import { Miniature } from './miniature.service';

export interface Post {
  id: number,
  title: string,
  author: string,
  mini: Miniature,
  likes: number,
  comments: string[],
  tags: string[]
}

@Injectable({
  providedIn: 'root'
})

export class SocialfeedService {

  posts: Post[];
  postIds: number;

  constructor() {
    this.posts = [
      {
        id: 1,
        title: "Check out my kewl mini!",
        author: "randomUser",
        likes: 1,
        comments: ["Wow so cool", "I like it"],
        mini: {
          id: 1,
          title: "My mini",
          imgUrl: "/assets/miniature.jfif",
          desc: "Blah blah blah description",
          brand: "Reaper",
          game: "DnD",
          paints: [],
        },
        tags: ["dnd"]
      },
      {
        id: 2,
        title: "Y'all like my new brush set?",
        author: "differentRandomUser",
        likes: 36,
        comments: ["Wow so cool"],
        mini: {
          id: 2,
          title: "My mini",
          imgUrl: "/assets/brushes.jfif",
          desc: "Blah blah blah description",
          brand: "Citadel",
          game: "Warhammer AoS",
          paints: [],
        },
        tags: ["warhammer"]
      },
      {
        id: 2,
        title: "Need some help painting my new mini",
        author: "userOne",
        likes: 4,
        comments: ["Wow so cool", "I like it", "Yes"],
        mini: {
          id: 3,
          title: "My mini",
          imgUrl: "/assets/dragon.jpeg",
          desc: "Blah blah blah description",
          brand: "Citadel",
          game: "Warhammer AoS",
          paints: [],
        },
        tags: ["warhammer"]
      },
      {
        id: 3,
        title: "Need some suggestions on what new miniatures to buy...",
        author: "userTwo",
        likes: 2,
        comments: ["Wow so cool", "I like it", "Yes", "Get it", "Just DO IT"],
        mini: {
          id: 4,
          title: "My mini",
          imgUrl: "/assets/no.png",
          desc: "Blah blah blah description",
          brand: "Citadel",
          game: "Warhammer AoS",
          paints: [],
        },
        tags: ["warhammer"]
      },
      {
        id: 4,
        title: "Just another mini showcase.",
        author: "userThree",
        likes: 57,
        comments: ["Wow so cool"],
        mini: {
          id: 5,
          title: "My mini",
          imgUrl: "/assets/anotherMini.jpg",
          desc: "Blah blah blah description",
          brand: "Citadel",
          game: "Warhammer AoS",
          paints: [],
        },
        tags: ["warhammer"]
      }
    ];
    this.postIds = 5;
  }

  getPosts() {    
    return this.posts;
  }

  getMyPosts() {
    return this.posts.filter(currentPost => { return currentPost.author == "testuser" });
  }

  createPost(post) {
    this.posts.push(post);
  }

  createNewPost(post){
    this.posts.unshift(post);
  }

  updatePost(post) {
    var postIndex = this.getIndexOfPostById(post.id);
    this.posts[postIndex] = post; 
    this.posts[postIndex].tags = this.generateTags(post);
  }

  deletePost(post) {
    let index = this.getIndexOfPostById(post.id)
    if (index === -1) {
      console.log("no id found");
    } else {
        this.posts.splice(index, 1);
    }
  }

  doesPostExistByMiniId(id) {
    return (this.posts.findIndex((e) => e.id === id) !== -1);
  }

  getIndexOfPostById(id) {
    return this.posts.findIndex((e) => e.id === id);
  }

  generateTags(post) {
    return [post.title, post.user, post.mini.game, post.mini.brand];
  }

  generateNewId() {
    return this.postIds++;
  }

  likePost(post) {
    return post.likes++;
  }

  addComment(post, comment) {
    return post.comments.push(comment);
  }

  searchByTerm(findTerm) {
    return this.posts.filter(currentPost => {
      if(currentPost.title && findTerm || currentPost.author && findTerm) {
        if(currentPost.title.toLowerCase().indexOf(findTerm.toLowerCase()) > -1) {
          return true;
        } else if(currentPost.author.toLowerCase().indexOf(findTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
}
