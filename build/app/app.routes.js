System.register(['./common/auth.guard', './login/components/login.component', './home/components/home.component', './myprofile/components/myprofile.component', './management/management.main.component', './user/components/user.new.component', './user/components/user.edit.component', './user/components/service.edit.component', './user/components/user.list.component', './role/components/role.list.component', './role/components/role.edit.component', './role/components/role.new.component', './group/components/group.list.component', './group/components/group.new.component', './group/components/group.edit.component', './item/item.main.component', './gallery/components/gallery.list.component', './gallery/components/gallery.new.component', './errorpages/components/page.error'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var auth_guard_1, login_component_1, home_component_1, myprofile_component_1, management_main_component_1, user_new_component_1, user_edit_component_1, service_edit_component_1, user_list_component_1, role_list_component_1, role_edit_component_1, role_new_component_1, group_list_component_1, group_new_component_1, group_edit_component_1, item_main_component_1, gallery_list_component_1, gallery_new_component_1, page_error_1;
    var routes;
    return {
        setters:[
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (myprofile_component_1_1) {
                myprofile_component_1 = myprofile_component_1_1;
            },
            function (management_main_component_1_1) {
                management_main_component_1 = management_main_component_1_1;
            },
            function (user_new_component_1_1) {
                user_new_component_1 = user_new_component_1_1;
            },
            function (user_edit_component_1_1) {
                user_edit_component_1 = user_edit_component_1_1;
            },
            function (service_edit_component_1_1) {
                service_edit_component_1 = service_edit_component_1_1;
            },
            function (user_list_component_1_1) {
                user_list_component_1 = user_list_component_1_1;
            },
            function (role_list_component_1_1) {
                role_list_component_1 = role_list_component_1_1;
            },
            function (role_edit_component_1_1) {
                role_edit_component_1 = role_edit_component_1_1;
            },
            function (role_new_component_1_1) {
                role_new_component_1 = role_new_component_1_1;
            },
            function (group_list_component_1_1) {
                group_list_component_1 = group_list_component_1_1;
            },
            function (group_new_component_1_1) {
                group_new_component_1 = group_new_component_1_1;
            },
            function (group_edit_component_1_1) {
                group_edit_component_1 = group_edit_component_1_1;
            },
            function (item_main_component_1_1) {
                item_main_component_1 = item_main_component_1_1;
            },
            function (gallery_list_component_1_1) {
                gallery_list_component_1 = gallery_list_component_1_1;
            },
            function (gallery_new_component_1_1) {
                gallery_new_component_1 = gallery_new_component_1_1;
            },
            function (page_error_1_1) {
                page_error_1 = page_error_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [
                { path: '', component: login_component_1.LoginComponent },
                { path: 'login', component: login_component_1.LoginComponent },
                { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
                { path: 'myprofile', component: myprofile_component_1.MyProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
                { path: 'user/new', component: user_new_component_1.UserNewComponent, canActivate: [auth_guard_1.AuthGuard] },
                { path: 'user/edit', component: user_edit_component_1.UserEditComponent, canActivate: [auth_guard_1.AuthGuard] },
                { path: 'user/service', component: service_edit_component_1.ServiceEditComponent, canActivate: [auth_guard_1.AuthGuard] },
                { path: 'role/new', component: role_new_component_1.RoleNewComponent, canActivate: [auth_guard_1.AuthGuard] },
                { path: 'role/edit', component: role_edit_component_1.RoleEditComponent, canActivate: [auth_guard_1.AuthGuard] },
                { path: 'group/new', component: group_new_component_1.GroupNewComponent, canActivate: [auth_guard_1.AuthGuard] },
                { path: 'group/edit', component: group_edit_component_1.GroupEditComponent, canActivate: [auth_guard_1.AuthGuard] },
                {
                    path: 'management', component: management_main_component_1.ManagementMainComponent, canActivate: [auth_guard_1.AuthGuard],
                    children: [
                        { path: 'user', component: user_list_component_1.UserListComponent, canActivate: [auth_guard_1.AuthGuard] },
                        { path: 'role', component: role_list_component_1.RoleListComponent, canActivate: [auth_guard_1.AuthGuard] },
                        { path: 'group', component: group_list_component_1.GroupListComponent, canActivate: [auth_guard_1.AuthGuard] }
                    ]
                },
                {
                    path: 'item', component: item_main_component_1.ItemMainComponent, canActivate: [auth_guard_1.AuthGuard],
                    children: [
                        { path: 'gallery', component: gallery_list_component_1.GalleryListComponent, canActivate: [auth_guard_1.AuthGuard] },
                        { path: 'gallery/new', component: gallery_new_component_1.GalleryNewComponent, canActivate: [auth_guard_1.AuthGuard] }
                    ]
                },
                { path: 'error', component: page_error_1.PageError },
                { path: '**', component: login_component_1.LoginComponent }
            ]);
        }
    }
});

//# sourceMappingURL=app.routes.js.map
