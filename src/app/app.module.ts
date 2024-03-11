import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  declarations: [],
  bootstrap: [],
})
export class AppModule {}
