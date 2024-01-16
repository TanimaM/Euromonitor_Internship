import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserAccService } from './user-account.service';
import { UserAccount } from '../models/user-accounts.model';

describe('UserAccService', () => {
  let service: UserAccService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    configureTestingModule();
    service = TestBed.inject(UserAccService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    testShouldBeCreated(service);
  });

  it('should get user accounts', () => {
    const mockUserAccounts: UserAccount[] = [
      { UserID: 1, Username: 'janes', Password: 'password1', RoleID: 1, Role: 'Admin', EmployeeID: 1 },
    ];

    testShouldGetUserAccounts(service, httpTestingController, mockUserAccounts);
  });

  it('should get user by username and password', () => {
    const username = 'janes';
    const password = 'password1';
    const mockUserAccount: UserAccount = { UserID: 1, Username: 'janes', Password: 'password1', RoleID: 1, Role: 'Admin', EmployeeID: 1 };

    testShouldGetUserByUsernameAndPassword(service, httpTestingController, username, password, mockUserAccount);
  });

  it('should return null when no user found by username and password', () => {
    const username = 'nonExistentUser';
    const password = 'nonExistentPassword';

    testShouldReturnNullForNonExistentUser(service, httpTestingController, username, password);
  });
});

function configureTestingModule() {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UserAccService],
  });
}

function testShouldBeCreated(service: UserAccService) {
  expect(service).toBeTruthy();
}

function testShouldGetUserAccounts(service: UserAccService, httpTestingController: HttpTestingController, mockUserAccounts: UserAccount[]) {
  service.getUserAccounts().subscribe((userAccounts) => {
    expect(userAccounts).toEqual(mockUserAccounts);
  });

  const req = httpTestingController.expectOne('http://localhost:3000/userAccounts');
  expect(req.request.method).toEqual('GET');

  req.flush(mockUserAccounts);
}

function testShouldGetUserByUsernameAndPassword(
  service: UserAccService,
  httpTestingController: HttpTestingController,
  username: string,
  password: string,
  mockUserAccount: UserAccount
) {
  service.getUserByUsernameAndPassword(username, password).subscribe((userAccount) => {
    expect(userAccount).toEqual(mockUserAccount);
  });

  const req = httpTestingController.expectOne(`http://localhost:3000/userAccounts?Username=${username}&Password=${password}`);
  expect(req.request.method).toEqual('GET');

  req.flush([mockUserAccount]);
}

function testShouldReturnNullForNonExistentUser(
  service: UserAccService,
  httpTestingController: HttpTestingController,
  username: string,
  password: string
) {
  service.getUserByUsernameAndPassword(username, password).subscribe((userAccount) => {
    expect(userAccount).toBeNull();
  });

  const req = httpTestingController.expectOne(`http://localhost:3000/userAccounts?Username=${username}&Password=${password}`);
  expect(req.request.method).toEqual('GET');

  req.flush([]);
}
