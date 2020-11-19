import { Injectable } from '@angular/core';
import { IBlog } from '../interfaces/blog.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogs: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(2020, 4, 22, 10, 0),
      message: 'Sign up to create your account and start to use Angular Blog'
    }
  ];

  private users: Array<IUser> = [
    {
      id: 0,
      username: 'admin',
      email: 'admin@gmail.com',
      password: '1111'
    }
  ];

  constructor() { }

  getPost(): Array<IBlog> {
    return this.blogs;
  }

  setPost(newD: IBlog): void {
    this.blogs.push(newD);
  }

  setUser(newU: IUser): void {
    this.users.push(newU);
  }

  deletePost(id: number | string): void {
    const index = this.blogs.findIndex(d => d.id === id);
    this.blogs.splice(index, 1);
  }

  getBlogs(): Array<IBlog> {
    return this.blogs;
  }

  getUsers(): Array<IUser> {
    return this.users;
  }
}