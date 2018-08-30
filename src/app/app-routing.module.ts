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
import { OfferPlatformComponent } from './core/modules/home-page/offer-platform/offer-platform.component';
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
/*Our Services*/

const routes: Routes = [
    {path:'', component:IndexComponent},
    {path:'company', component: HomeComponent},
    {path:'company/offers/new', component:NewOfferComponent},
    {path:'company/offers/see', component:OffersComponent},
    {path:'company/profile', component:ProfileComponent , resolve: {profile: ProfileResolver}},
    {path:'company/followers', component:FollowersComponent},
    {path:'company/my-orders', component:MyOrdersComponent},
    {path:'company/offers/:id/edit', component:OfferEditComponent, resolve: {offer: OfferResolver}},

    {path:'admin', component: AdminHomeComponent},
    {path:'admin/tenders/new', component:AdminNewTenderComponent},
        {path:'admin/tenders/mine', component:AdminAllTendersComponent},
        {path:'admin/tenders/:tenderId/company', component:AdminTenderInCompanyComponent, resolve : {tender : AdminTenderResolver}},
        {path:'admin/tenders/school', component:AdminMyTendersComponent},
        {path:'admin/tenders/:tenderId/details', component:AdminMyTendersComponent},
        {path:'admin/orders', component:AdminOrdersComponent},
        {path:'admin/orders/:orderId/view', component:AdminOrderViewComponent},
        {path:'admin/requests', component:AdminRequestsComponent},
        {path:'admin/request/view', component:AdminRequestsViewComponent},
        {path:'admin/history', component:AdminHistoryComponent},
        {path:'admin/history/:orderId/view', component:AdminHistoryViewComponent},

    {path:'school', component:SchoolHomeComponent},
    {path:'school/followers', component:SchoolFollowersComponent},
    {path:'school/orders', component:SchoolOrdersComponent},
    {path:'school/history', component:SchoolOrdersHistoryComponent},
    {path:'school/profile', component:SchoolProfileComponent},
    {path:'school/tenders/new', component:NewTenderComponent},  
    {path:'school/collective/all', component:AllCollectiveTendersComponent},
    {path:'school/tender/:tenderId/collective', component:CollectiveTenderComponent, resolve : {tender: SchoolTenderResolver}},
    {path:'school/tenders/mine', component:MyTendersComponent},
    {path:'school/tender/:tenderId/view', component:ViewTenderComponent, resolve: {tender:MyTenderResolver}},
    
    { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
    {
        path: 'offer-platform', component: OfferPlatformComponent, canActivate: [AuthGuard],
        children: [
        ]
    },
    {path:'offer-details/:company_id/:offer_id', component: OfferDetailsComponent, canActivate: [AuthGuard]},
    { path: 'company/:id', component: CompanyProfileComponent, canActivate: [AuthGuard]},
    { path: 'insurance-platform', component: InsurancePlatformComponent , canActivate: [AuthGuard]},
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'unifying-platform', component: UnifyingPlatformComponent },
    { path: 'purchase-platform', component: PurchasePlatformComponent },
    { path: 'reigsteration-success', component: RegisterationSuccessComponent },
    { path: 'purchase-category', component: PurchaseCategoryComponent }
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