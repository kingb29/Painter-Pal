import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
var routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'social',
                children: [
                    {
                        path: '',
                        loadChildren: '../social/social.module#SocialPageModule'
                    }
                ]
            },
            {
                path: 'shopping',
                children: [
                    {
                        path: '',
                        loadChildren: '../shopping/shopping.module#ShoppingPageModule'
                    }
                ]
            },
            {
                path: 'collections',
                children: [
                    {
                        path: '',
                        loadChildren: '../collections/collections.module#CollectionsPageModule'
                    }
                ]
            },
            {
                path: 'more',
                children: [
                    {
                        path: '',
                        loadChildren: '../more/more.module#MorePageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/social',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/social',
        pathMatch: 'full'
    }
];
var TabsPageRoutingModule = /** @class */ (function () {
    function TabsPageRoutingModule() {
    }
    TabsPageRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes)
            ],
            exports: [RouterModule]
        })
    ], TabsPageRoutingModule);
    return TabsPageRoutingModule;
}());
export { TabsPageRoutingModule };
//# sourceMappingURL=tabs.router.module.js.map