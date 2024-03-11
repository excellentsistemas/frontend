import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { DemandListComponent } from './pages/demand-list/demand-list.component';
import { DemandCreateComponent } from './pages/demand-create/demand-create.component';

export const routes: Routes = [
  {
    path: 'product',
    children: [
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: 'create',
        component: ProductCreateComponent,
      },
      {
        path: 'edit/:guid',
        component: ProductEditComponent,
      },
    ],
  },
  {
    path: 'demand',
    children: [
      {
        path: 'list',
        component: DemandListComponent,
      },
      {
        path: 'create',
        component: DemandCreateComponent,
      },
    ],
  },
];
