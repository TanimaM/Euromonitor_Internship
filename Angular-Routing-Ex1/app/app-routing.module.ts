import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResearchDepartmentComponent } from './components/research-department/research-department.component';
import { CatalystComponent } from './components/research-department/catalyst/catalyst.component';
import { OneResearchComponent } from './components/research-department/one-research/one-research.component';
import { BusinessComponent } from './components/business/business.component';
import { MarketingComponent } from './components/business/marketing/marketing.component';
import { SalesComponent } from './components/business/sales/sales.component';
import { AccountsComponent } from './components/business/accounts/accounts.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { SoftwareEngineeringComponent } from './components/technology/software-engineering/software-engineering.component';
import { PublicationComponent } from './components/technology/publication/publication.component';
import { CloudEngineeringComponent } from './components/technology/cloud-engineering/cloud-engineering.component';
import { DataTransformationComponent } from './components/technology/software-engineering/data-transformation/data-transformation.component';
import { PassportComponent } from './components/technology/software-engineering/passport/passport.component';
import { IssacComponent } from './components/technology/software-engineering/issac/issac.component';
import { EcomComponent } from './components/technology/software-engineering/ecom/ecom.component';
import { Dt1Component } from './components/technology/software-engineering/data-transformation/dt1/dt1.component';
import { Dt2Component } from './components/technology/software-engineering/data-transformation/dt2/dt2.component';
import { Dt3Component } from './components/technology/software-engineering/data-transformation/dt3/dt3.component';
import { Pp1Component } from './components/technology/software-engineering/passport/pp1/pp1.component';
import { Pp2Component } from './components/technology/software-engineering/passport/pp2/pp2.component';
import { Pp3Component } from './components/technology/software-engineering/passport/pp3/pp3.component';
import { Pp4Component } from './components/technology/software-engineering/passport/pp4/pp4.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'research-department', component: ResearchDepartmentComponent, children: [
    { path: 'catalyst', component: CatalystComponent },
    { path: 'one-research', component: OneResearchComponent },
  ]},
  { path: 'business', component: BusinessComponent, children: [
    { path: 'marketing', component: MarketingComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'accounts', component: AccountsComponent },
  ]},
  { path: 'technology', component: TechnologyComponent, children: [
    { path: 'software-engineering', component: SoftwareEngineeringComponent, children: [
      { path: 'data-transformation', component: DataTransformationComponent, children: [
        { path: 'dt1', component: Dt1Component },
        { path: 'dt2', component: Dt2Component },
        { path: 'dt3', component: Dt3Component },
      ]},
      { path: 'passport', component: PassportComponent, children: [
        { path: 'pp1', component: Pp1Component },
        { path: 'pp2', component: Pp2Component },
        { path: 'pp3', component: Pp3Component },
        { path: 'pp4', component: Pp4Component },
      ]},
      { path: 'issac', component: IssacComponent },
      { path: 'ecom', component: EcomComponent },
    ]},
    { path: 'publication', component: PublicationComponent },
    { path: 'cloud-engineering', component: CloudEngineeringComponent },
  ]},
  { path: '', component: HomeComponent, pathMatch: 'full' }, 
  { path: '**', component: NotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
