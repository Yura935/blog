import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Blog } from '../classes/blog.model';
import { IBlog } from '../interfaces/blog.interface';
import { IUser } from '../interfaces/user.interface';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  check: boolean = true;
  modalRef: BsModalRef;
  blogs: Array<IBlog> = [];
  users: Array<IUser> = [];
  userName: string = '';
  userEmail: string = '';
  userPass: string = '';
  email: string = '';
  name: string = '';
  pass: string = '';
  editDel: boolean = false;
  ind = null;
  title: string = '';
  text: string = '';
  newUser: Array<IUser> = [];
  constructor(private modalService: BsModalService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
    this.getUsers();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getBlogs(): void {
    this.blogs = this.blogService.getBlogs();
  }

  getUsers(): void {
    this.users = this.blogService.getUsers();
  }

  submitIn(): void {
    if (this.userEmail.length > 0 && this.userPass.length > 0) {
      if (this.users.findIndex(d => d.email == this.userEmail) >= 0 &&
        this.users.findIndex(d => d.password == this.userPass) >= 0) {
        this.newUser = this.users.filter(d => d.email == this.userEmail);
        if (this.userEmail == 'admin@gmail.com' && this.userPass == '1111') {
          this.editDel = true;
          this.check = false;
          this.userName = 'admin';
          this.clear();
        }
        else {
          this.editDel = false;
          this.check = false;
          this.userName = this.newUser[0].username;
          this.clear();
        }
      }
      else {
        this.clear();
      }
    }
    else {
      this.clear();
    }
  }

  submitUp(): void {
    if (this.name.length > 0 && this.email.length > 0 && this.pass.length > 0) {
      if (this.users.findIndex(d => d.email == this.email) < 0 &&
        this.users.findIndex(d => d.username == this.name) < 0) {
        const newUser = {
          id: 1,
          username: this.name,
          email: this.email,
          password: this.pass
        }
        if (this.users.length > 1) {
          newUser.id = +this.users.slice(-1)[0].id + 1;
        }
        this.blogService.setUser(newUser);
        this.userName = this.name;
        this.clear();
        this.check = false;
      }
      else {
        this.clear();
      }
    }
    else {
      this.clear();
    }
  }

  clear(): void {
    this.name = ''
    this.email = '';
    this.pass = '';
    this.userEmail = '';
    this.userPass = '';
    this.title = '';
    this.text = '';
  }

  deletePost(id: number): void {
    this.blogService.deletePost(id);
  }

  editPost(index: number): void {
    this.title = this.blogs[index].topic;
    this.text = this.blogs[index].message;
    this.ind = index;
  }

  addPost(): void {
    if (this.ind === null) {
      if (this.title.length > 0 && this.text.length > 0) {
        let post = new Blog(1, this.userName, this.title, new Date, this.text)
        if (this.blogs.length > 1) {
          post.id = +this.blogs.slice(-1)[0].id + 1;
        }
        this.blogService.setPost(post);
        this.title = '';
        this.text = '';
      }
    }
    else {
      this.blogs[this.ind].topic = this.title;
      this.blogs[this.ind].message = this.text;
      this.ind = null;
      this.title = '';
      this.text = '';
    }
  }

  signOut(): void {
    this.check = true;
    this.editDel = false;
    this.clear();
    this.userName = '';
  }
}