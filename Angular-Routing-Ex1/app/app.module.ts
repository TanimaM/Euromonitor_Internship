import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResearchDepartmentComponent } from './components/research-department/research-department.component';
import { BusinessComponent } from './components/business/business.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { CatalystComponent } from './components/research-department/catalyst/catalyst.component';
import { OneResearchComponent } from './components/research-department/one-research/one-research.component';
import { MarketingComponent } from './components/business/marketing/marketing.component';
import { SalesComponent } from './components/business/sales/sales.component';
import { AccountsComponent } from './components/business/accounts/accounts.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ResearchDepartmentComponent,
    BusinessComponent,
    TechnologyComponent,
    CatalystComponent,
    OneResearchComponent,
    MarketingComponent,
    SalesComponent,
    AccountsComponent,
    SoftwareEngineeringComponent,
    PublicationComponent,
    CloudEngineeringComponent,
    DataTransformationComponent,
    PassportComponent,
    IssacComponent,
    EcomComponent,
    Dt1Component,
    Dt2Component,
    Dt3Component,
    Pp1Component,
    Pp2Component,
    Pp3Component,
    Pp4Component,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
