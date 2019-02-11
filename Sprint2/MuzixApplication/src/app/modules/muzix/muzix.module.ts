import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { CardContainerComponent } from "./components/cardcontainer/cardcontainer.component";
import { HttpClientModule } from "@angular/common/http";
import { CardComponent } from "./components/card/card.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { SearchComponent } from "./components/search/search.component";
import { WishListComponent } from "./components/wish-list/wish-list.component";
import { AppRoutingModule } from "../../app-routing.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MuzixMaterialModule } from "./muzix.material.module";
import { DialogComponent } from "./components/dialog/dialog.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    HeaderComponent,
    CardContainerComponent,
    CardComponent,
    SearchComponent,
    WishListComponent,
    DashboardComponent,
    DialogComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MuzixMaterialModule
  ],
  // This needs to be added else Dialogcompoenant wont get open

  /*  https://stackoverflow.com/questions/41519481/angular2-material-dialog-has-issues-did-you-add-it-to-ngmodule-entrycomponent*/
  entryComponents: [DialogComponent],
  exports: [
    HeaderComponent,
    CardContainerComponent,
    CardComponent,
    WishListComponent,
    DialogComponent,
    FooterComponent
  ]
})
export class MuzixModule {}
