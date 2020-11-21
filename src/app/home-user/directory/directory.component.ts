import { Component, OnInit } from '@angular/core';
import {AccountService} from '@app/_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.less']
})
export class DirectoryComponent implements OnInit {
  users = null;


  constructor(private accountService: AccountService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

}
