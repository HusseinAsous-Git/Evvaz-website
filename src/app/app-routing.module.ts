import { CompanyProfileCpyComponent } from './core/modules/dashboards/company-profile-cpy/company-profile-cpy.component';
import { SchoolProfileCpyComponent } from './core/modules/dashboards/school-profile-cpy/school-profile-cpy.component';
import { SchoolParentComponent } from './core/modules/dashboards/school-parent/school-parent.component';
import { AdminParentComponent } from './core/modules/dashboards/admin-parent/admin-parent.component';
import { AdminConsiderViewComponent } from './core/modules/dsahboards/admin-consider-view/admin-consider-view.component';
import { AdminArchiveViewComponent } from './core/modules/dsahboards/admin-archive-view/admin-archive-view.component';
import { ConsideredComponent } from './core/modules/dsahboards/considered/considered.component';
import { ArchivedComponent } from './core/modules/dsahboards/archived/archived.component';
import { OrderProfileSchoolCpyComponent } from './core/modules/dashboards/order-profile-school-cpy/order-profile-school-cpy.component';
import { OrderProfileCompanyCpyComponent } from './core/modules/dashboards/order-profile-company-cpy/order-profile-company-cpy.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { OrderProfileComponent } from './core/modules/dashboards/order-profile-company/order-profile.component';
import { AdminTenderEditResolver } from './core/services/admin.tender.edit.resolver';
import { AdminTenderEditComponent } from './core/modules/dashboards/admin-tender-edit/admin-tender-edit.component';
import { AdminTenderResolver } from './core/services/admin.tender.resolver';
import { MyTenderResolver } from './core/services/mytender.resolver.service';
import { AllCollectiveTendersComponent } from './core/modules/dashboards/all-collective-tenders/all-collective-tenders.component';
import { AdminTenderInCompanyComponent } from './core/modules/dashboards/admin-tender-in-company/admin-tender-in-company.component';
import { AdminHistoryViewComponent } from './core/modules/dashboards/admin-history-view/admin-history-view.component';
import { AdminAllTendersComponent } from './core/modules/dashboards/admin-all-tenders/admin-all-tenders.component';
import { InsurancePlatformComponent } from './core/modules/insurance-platform/insurance-platform.component';
import { CollectiveTenderComponent } from './core/modules/dashboards/collective-tender/collective-tender.component';
import { ViewTenderComponent } from './core/modules/dashboards/view-tender/view-tender.component';
import { MyTendersComponent } from './core/modules/dashboards/my-tenders/my-tenders.component';
import { OfferPlatformComponent } from './core/modules/offer-platform/offer-platform.component';
import { AuthGuard } from './core/services/auth.gaurd.service';
import { HomePageComponent } from './core/modules/home-page/home-page.component';
/*Outer Imports*/
import { NgModule, Component } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

/*Our Components*/
import { LoginComponent } from './core/modules/login/login.component';
import { IndexComponent } from './core/modules/index/index.component';
import { SignUpComponent } from './core/modules/sign-up/sign-up.component';
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
import { OfferDetailsComponent } from './core/modules/offer-details/offer-details.component';
import { NewTenderComponent } from './core/modules/dashboards/new-tender/new-tender.component';
import { UnifyingPlatformComponent } from './core/modules/unifying-platform/unifying-platform.component';
import { PurchasePlatformComponent } from './core/modules/purchase-platform/purchase-platform.component';
import { AdminHomeComponent } from './core/modules/dashboards/admin-home/admin-home.component';
import { AdminNewTenderComponent } from './core/modules/dashboards/admin-new-tender/admin-new-tender.component';
import { AdminMyTendersComponent } from './core/modules/dashboards/admin-my-tenders/admin-my-tenders.component';
import { AdminOrdersComponent } from './core/modules/dashboards/admin-orders/admin-orders.component';
import { AdminRequestsComponent } from './core/modules/dashboards/admin-requests/admin-requests.component';
import { AdminHistoryComponent } from './core/modules/dashboards/admin-history/admin-history.component';
import { AdminRequestsViewComponent } from './core/modules/dashboards/admin-requests-view/admin-requests-view.component';
import { AdminOrderViewComponent } from './core/modules/dashboards/admin-order-view/admin-order-view.component';
import { RegisterationSuccessComponent } from './core/modules/registeration-success/registeration-success.component';
import { SchoolTenderResolver } from './core/services/school.tender.resolver';
import { PurchaseCategoryComponent } from './core/modules/purchase-category/purchase-category.component';
import { RequestDetailsComponent } from './core/modules/request-details/request-details.component';
import { OrderProfileSchoolComponent } from './core/modules/dashboards/order-profile-school/order-profile-school.component';
import { AuthGuardCompany } from './core/services/auth.guard.company.service';
import { AuthGuardSchool } from './core/services/auth.guard.school.service';
import { AuthGuardAdmin } from './core/services/auth.guard.admin.service';
import { UnifyingCatComponent } from './core/modules/unifying-cat/unifying-cat.component';
import { CompanyParentComponent } from './core/modules/dashboards/company-parent/company-parent.component';
/*Our Services*/

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home', component:IndexComponent},


    // company routes
    {path:'company/intro/profile', component:CompanyProfileCpyComponent,canActivate: [AuthGuardCompany]},
    {path:'company', component:CompanyParentComponent,  canActivate: [AuthGuardCompany], children: [
        {path:'intro', component: HomeComponent},
        {path:'offers/new', component:NewOfferComponent},
        {path:'offers/see', component:OffersComponent},
        {path:'profile', component:ProfileComponent , resolve: {profile: ProfileResolver}},
        {path:'followers', component:FollowersComponent},
        {path:'my-orders', component:MyOrdersComponent},
        {path:'offers/:id/edit', component:OfferEditComponent, resolve: {offer: OfferResolver}},
        {path:'', component:IndexComponent},
        // {path:'company', component: HomeComponent},
        {path:'offers/new', component:NewOfferComponent},
        {path:'offers/see', component:OffersComponent},
        {path:'profile', component:ProfileComponent , resolve: {profile: ProfileResolver}},
        {path:'followers', component:FollowersComponent},
        {path:'my-orders', component:MyOrdersComponent},
        {path:'offers/:id/edit', component:OfferEditComponent, resolve: {offer: OfferResolver}}
    ]}
   ,

        //    admin routes
    {path:'admin', component:AdminParentComponent, canActivate:[AuthGuardAdmin], children:[
        {path:'intro', component: AdminHomeComponent},
        {path:'tenders/new', component:AdminNewTenderComponent},
        {path:'tenders/mine', component:AdminAllTendersComponent},
        {path:'tenders/:tenderId/company', component:AdminTenderInCompanyComponent, resolve : {tender : AdminTenderResolver}},
        {path:'tenders/:tenderId/edit', component:AdminTenderEditComponent, resolve : {tender : AdminTenderResolver}},
        {path:'tenders/:tenderId/school', component:AdminMyTendersComponent},
        {path:'tenders/:tenderId/details', component:AdminMyTendersComponent},
        {path:'orders', component:AdminOrdersComponent},
        {path:'orders/:orderId/view', component:AdminOrderViewComponent},
        {path:'orders/:orderId/view/company/profile/:profileId', component:OrderProfileComponent},
        {path:'orders/:orderId/view/school/profile/:profileId', component:OrderProfileSchoolComponent},
        {path:'orders/:orderId/view/company/profile/:profileId/cpy', component:OrderProfileCompanyCpyComponent},
        {path:'orders/:orderId/view/school/profile/:profileId/cpy', component:OrderProfileSchoolCpyComponent},
        {path:'requests', component:AdminRequestsComponent},
        {path:'requests/archive', component:ArchivedComponent},
        {path:'requests/consider', component:ConsideredComponent},
        {path:'request/:requestId/view', component:AdminRequestsViewComponent},
        {path:'considered/:requestId/view', component:AdminConsiderViewComponent},
        {path:'archived/:requestId/view', component:AdminArchiveViewComponent},
        {path:'history', component:AdminHistoryComponent},
        {path:'history/:orderId/view', component:AdminHistoryViewComponent}
    ]}
   ,


//    school routes


{path:'school/intro/profile', component:SchoolProfileCpyComponent,canActivate: [AuthGuardSchool]},
   {path:'school', component:SchoolParentComponent, canActivate: [AuthGuardSchool], children: [
       
    {path:'intro', component:SchoolHomeComponent},
    {path:'followers', component:SchoolFollowersComponent},
    {path:'orders', component:SchoolOrdersComponent},
    {path:'history', component:SchoolOrdersHistoryComponent},
    {path:'profile', component:SchoolProfileComponent},
    {path:'tenders/new', component:NewTenderComponent},  
    {path:'collective/all', component:AllCollectiveTendersComponent},
    {path:'tender/:tenderId/collective/:schoolId', component:CollectiveTenderComponent, resolve : {tender: SchoolTenderResolver}},
    {path:'tenders/mine', component:MyTendersComponent},
    {path:'tender/:tenderId/view', component:ViewTenderComponent, resolve: {tender:MyTenderResolver}}
   ] }
    ,
    




    { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
    {path: 'offer-platform', component: OfferPlatformComponent},
    {path:'offer-details/:company_id/:offer_id', component: OfferDetailsComponent, canActivate: [AuthGuard]},
    { path: 'company/:id', component: CompanyProfileComponent, canActivate: [AuthGuard]},
    { path: 'insurance-platform', component: InsurancePlatformComponent , canActivate: [AuthGuard]},
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'unifying-platform', component: UnifyingPlatformComponent },
    { path: 'purchase-platform', component: PurchasePlatformComponent },
    { path: 'reigsteration-success', component: RegisterationSuccessComponent },
    { path: 'purchase-category/:catId', component: PurchaseCategoryComponent },
    { path: 'request-details/:reqId', component: RequestDetailsComponent },
    { path: 'unifying-cat/:id', component: UnifyingCatComponent },
    {path:'page-not-found',component:PageNotFoundComponent},
    {path:'**' ,redirectTo:'page-not-found'}
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
        RouterModule.forRoot(routes,{useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}