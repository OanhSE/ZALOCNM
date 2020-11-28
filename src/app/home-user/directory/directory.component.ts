import { Component, OnInit } from '@angular/core';
import {AccountService, AlertService} from '@app/_services';
import {first} from 'rxjs/operators';
import {Contact} from '@app/_models/contact';
import {User} from '@app/_models';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '@app/_services/contact.service';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.less']
})
export class DirectoryComponent implements OnInit {
  users: User[] = new Array();
  usersrequest: User[] = new Array();
  listcontact: Contact[];
  contact: Contact;
  phone: string;
  user: User;
  u: User;
  userTagets: User[];
  usTarget: User;
  search;
  check: number;
  constructor(
    private accountService: AccountService,
    private router: Router,
    private contactservice: ContactService,
    private route: ActivatedRoute,
    private  alertService: AlertService,
  ) {
    this.accountService.user.subscribe(x => this.user = x);
   // this.user = this.accountService.user;
  }


  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.accountService.getAll()
    //   .pipe(first())
    //   .subscribe(users => this.users = users);
    // // this.getContactsByContactidUser(this.user.id);
    this.getAllContactsByUser(this.user.id);

  }
  // tslint:disable-next-line:typedef
  findByPhone(){
    console.log(this.phone);
    this.accountService.getByPhone(this.phone)
      .subscribe((data: User) => {
        /*this.category = data;*/
        this.u = data;
        // console.log(data);
      });


  }
  // tslint:disable-next-line:typedef
  getListContactFriendByUser(id: string){
    this.contactservice.getListContactFriendByUser(id).subscribe((data) => {
      this.listcontact = data;
      console.log(data);
      this.listcontact.forEach( (x) => {
        this.accountService.getById(x.userTarget).subscribe(( usert ) => {
          this.u = usert;
          console.log(this.u);
          this.usersrequest.push(this.u);
        });

      });
    });

  }
  // tslint:disable-next-line:typedef
  getAllContactsByUser(id: string){
    this.contactservice.getAllContactsByUser(id).subscribe((data) => {
           this.listcontact = data;
           console.log(data);
           this.listcontact.forEach( (x) => {
               this.accountService.getById(x.userTarget).subscribe(( usert ) => {
                     this.u = usert;
                     console.log(this.u);
                     this.users.push(this.u);
               });

           });
        });

   }
  // tslint:disable-next-line:typedef
   saveContact(idRequest, idTarget ){
    this.contactservice.saveContact(idRequest, idTarget)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Thêm danh bạ thành công', { keepAfterRouteChange: true });
          this.router.navigate(['../directory'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);

        }
      });
   }
  // tslint:disable-next-line:typedef
  checkAddFriend(id1: string , id2: string){
        this.contactservice.checkRequestFriend(id1, id2).subscribe(x => {
          this.check = x;
        });
        return this.check;
  }

}
