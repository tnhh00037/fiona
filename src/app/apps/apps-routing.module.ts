import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TotalComponent } from "./total/total.component";
import { AgeComponent } from "./age/age.component";
import { GenderComponent } from "./gender/gender.component";

const routes: Routes = [
  {
    path: "total",
    component: TotalComponent
  },
  {
    path: "age",
    component: AgeComponent
  },
  {
    path: "gender",
    component: GenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule {}
