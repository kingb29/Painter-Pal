import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
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

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
