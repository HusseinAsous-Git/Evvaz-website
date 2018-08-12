import { OfferPlatformComponent } from './core/modules/home-page/offer-platform/offer-platform.component';
import { AuthGuard } from './core/services/auth.gaurd.service';
import { HomePageComponent } from './core/modules/home-page/home-page.component';
/*Outer Imports*/
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

/*Our Components*/
import { LoginComponent } from './core/modules/login/login.component';
import { IndexComponent } from './core/modules/index/index.component';
import { SignUpComponent } from './core/modules/sign-up/sign-up.component';
import { UnifyingPlatformComponent } from './core/modules/unifying-platform/unifying-platform.component';
import { CompanyProfileComponent } from './core/modules/company-profile/company-profile.component';
import { HomeComponent } from './core/modules/dashboards/home/home.component';
import { NewOfferComponent } from './core/modules/dashboards/new-offer/new-offer.component';
import { OffersComponent } from './core/modules/dashboards/offers/offers.component';
import { ProfileComponent } from './core/modules/dashboards/profile/profile.component';
import { ProfileResolver } from './core/services/profle.resolver';
import { FollowersComponent } from './core/modules/dashboards/followers/followers.component';
import { MyOrdersComponent } from './core/modules/dashboards/my-orders/my-orders.component';
import { OfferEditComponent } from './core/modules/dashboards/offer-edit/offer-edit.component';
import { OfferResolver } from './core/services/offer.resolver.service';
import { SchoolHomeComponent } from './core/modules/dashboards/school-home/school-home.component';
import { SchoolFollowersComponent } from './core/modules/dashboards/school-followers/school-followers.component';
import { SchoolOrdersComponent } from './core/modules/dashboards/school-orders/school-orders.component';
import { SchoolOrdersHistoryComponent } from './core/modules/dashboards/school-orders-history/school-orders-history.component';
import { SchoolProfileComponent } from './core/modules/dashboards/school-profile/school-profile.component';

/*Our Services*/

const routes: Routes = [
    {path:'', component: HomeComponent, children: [
        {path:'offers/new', component:NewOfferComponent},
        {path:'offers/see', component:OffersComponent},
        {path:'profile', component:ProfileComponent , resolve: {profile: ProfileResolver}},
        {path:'followers', component:FollowersComponent},
        {path:'my-orders', component:MyOrdersComponent},
        {path:'offers/:id/edit', component:OfferEditComponent, resolve: {offer: OfferResolver}}



    ]},
    {path:'school', component:SchoolHomeComponent, children: [
        {path:'followers', component:SchoolFollowersComponent},
        {path:'orders', component:SchoolOrdersComponent},
        {path:'history', component:SchoolOrdersHistoryComponent},
        {path:'profile', component:SchoolProfileComponent},
    ]},
    { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
    {
        path: 'offer-platform', component: OfferPlatformComponent, 
        children: [
        ]
    },
    { path: 'company/:id', component: CompanyProfileComponent},
    { path: 'unifying-platform', component: UnifyingPlatformComponent },
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    
];

/*Our Services

const routes: Routes = [
  {path: '', component: IndexComponent,

    children: [

    ]},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'sign-up', component: SignUpComponent},
];*/

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}