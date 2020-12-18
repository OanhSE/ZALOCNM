import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {AccountService, AlertService} from '@app/_services';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '@app/_services/contact.service';
import {first} from 'rxjs/operators';
import {Contact} from '@app/_models/contact';

@Component({
  selector: 'app-directory-friend-target',
  templateUrl: './directory-friend-target.component.html',
  styleUrls: ['./directory-friend-target.component.less']
})
export class DirectoryFriendTargetComponent implements OnInit {
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
constructor(
    private accountService: AccountService,
    private contactservice: ContactService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
     this.accountService.user.subscribe(x => this.user = x);
    // this.user = this.accountService.user;
  }

  ngOnInit(): void {
     this.getListContactFriendByUser(this.user.id);
  }
  // tslint:disable-next-line:typedef
  saveContact(idRequest, idTarget ){
    this.contactservice.saveContact(idRequest, idTarget)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Thêm danh bạ thành công', { keepAfterRouteChange: true});
          this.router.navigate(['../../directory'], { relativeTo: this.route });
        },
        error: error => {
          console.log(error);
          this.alertService.error('Thêm thất bại');
          
        }
      });
  }

  deleteContact(contact: Contact ){
    this.contactservice.deleteContact(contact)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Bỏ qua thành công', { keepAfterRouteChange: true});
          this.getListContactFriendByUser(this.user.id);
        },
        error: error => {
          console.log(error);
          this.alertService.error('Bỏ qua không thành công');
          
          
        }
      });
  }

 
  // tslint:disable-next-line:typedef
  getListContactFriendByUser(id: string){
    this.contactservice.getListContactFriendByUser(id).subscribe((data) => {
      this.listcontact = data;
      console.log(data);
      this.listcontact.forEach( (x) => {
        this.accountService.getById(x.userRequest).subscribe(( usert ) => {
          this.u = usert;
          console.log(this.u);
          this.usersrequest.push(this.u);
        });

      });
    });

  }
}
