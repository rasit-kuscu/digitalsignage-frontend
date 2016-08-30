import { RouterConfig } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { LoginComponent } from './login/components/login.component';
import { HomeComponent } from './home/components/home.component';
import { MyProfileComponent } from './myprofile/components/myprofile.component';
import { ManagementMainComponent } from './management/management.main.component';
import { UserNewComponent } from './user/components/user.new.component';
import { UserEditComponent } from './user/components/user.edit.component';
import { ServiceEditComponent } from './user/components/service.edit.component';
import { UserListComponent } from './user/components/user.list.component';
import { RoleListComponent } from './role/components/role.list.component';
import { RoleEditComponent } from './role/components/role.edit.component';
import { RoleNewComponent } from './role/components/role.new.component';
import { GroupListComponent } from './group/components/group.list.component';
import { GroupNewComponent } from './group/components/group.new.component';
import { GroupEditComponent } from './group/components/group.edit.component';
import { ItemMainComponent } from './item/item.main.component';
import { GalleryListComponent } from './gallery/components/gallery.list.component';
import { GalleryNewComponent } from './gallery/components/gallery.new.component';
import { PageError } from './errorpages/components/page.error';

export const routes: RouterConfig = [
  { path: '',       component:  LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'home',   component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'myprofile',   component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/new',   component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user/edit',   component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'user/service',   component: ServiceEditComponent, canActivate: [AuthGuard] },
  { path: 'role/new',   component: RoleNewComponent, canActivate: [AuthGuard] },
  { path: 'role/edit',   component: RoleEditComponent, canActivate: [AuthGuard] },
  { path: 'group/new',   component: GroupNewComponent, canActivate: [AuthGuard] },
  { path: 'group/edit',   component: GroupEditComponent, canActivate: [AuthGuard] },
  {
    path: 'management',   component: ManagementMainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'user', component: UserListComponent, canActivate: [AuthGuard] },
      { path: 'role', component: RoleListComponent, canActivate: [AuthGuard] },
      { path: 'group', component: GroupListComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'item', component: ItemMainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'gallery', component: GalleryListComponent, canActivate: [AuthGuard] },
      { path: 'gallery/new', component: GalleryNewComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'error',   component: PageError},
  { path: '**',     component: LoginComponent }
];
