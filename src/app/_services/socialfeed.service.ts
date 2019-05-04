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
          shared: true,
          postTitle: 'Check out my kewl mini!',
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
          shared: true,
          postTitle: 'Yall like my new brush set?',
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
          shared: true,
          postTitle: 'Need some help painting my new mini',
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
          shared: true,
          postTitle: 'Need some suggestions on what new miniatures to buy...',
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
          shared: true,
          postTitle: 'blahh',
        },
        tags: ["warhammer"]
      }
    ];
    this.postIds = 5;
  }

  getPosts() {    
    return this.posts;
  }

  createPost(mini, title, user) {
    var newPost = {
      id: this.generateNewId(),
      title: title,
      author: user,
      likes: 0,
      comments: [],
      mini: mini,
      tags: this.generateTags(mini, user, title)
    }
    this.posts.push(newPost);
  }

  updatePost(mini, title, user) {
    var postId = this.getIndexOfPostByMiniId(mini.id)
    this.posts[postId].title = title;
    this.posts[postId].mini = mini;
    this.posts[postId].tags = this.generateTags(mini, title, user);
  }

  deletePost(mini) {
    const index = this.posts.findIndex((post) => post.mini.id === mini.id);
    if (index === -1) {
      console.log("no id found");
    } else {
        this.posts.splice(index, 1);
    }
  }

  createOrUpdatePost(mini, title, user) {
    if (!this.doesPostExistByMiniId(mini.id)) {
        this.createPost(mini, title, user);
    } else {
        this.updatePost(mini, title, user);
    }
    console.log(this.posts);
  }

  doesPostExistByMiniId(id) {
    return (this.posts.findIndex((e) => e.id === id) !== -1);
  }

  getIndexOfPostByMiniId(id) {
    return this.posts.findIndex((e) => e.id === id);
  }

  generateTags(mini, user, title) {
    return [title, user, mini.game, mini.brand];
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
