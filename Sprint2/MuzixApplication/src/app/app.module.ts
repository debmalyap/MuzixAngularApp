import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MuzixModule } from "./modules/muzix/muzix.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MuzixModule, FlexLayoutModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
