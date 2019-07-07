import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppsRoutingModule } from "./apps-routing.module";
import { TotalComponent } from "./total/total.component";
import { AgeComponent } from "./age/age.component";
import { GenderComponent } from "./gender/gender.component";

@NgModule({
  declarations: [TotalComponent, AgeComponent, GenderComponent],
  imports: [CommonModule, AppsRoutingModule]
})
export class AppsModule {}
