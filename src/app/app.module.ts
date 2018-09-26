import { MyTenderResolver } from './core/services/mytender.resolver.service';
import { InsurancePlatformComponent } from './core/modules/insurance-platform/insurance-platform.component';
import { SchoolService } from './core/services/school.service';
import { SchoolProfileService } from './core/services/school.profile.service';
import { ProfileResolver } from './core/services/profle.resolver';
import { ProfileServiceDashboard } from './core/services/profile.service.dashboard';
import { OfferResolver } from './core/services/offer.resolver.service';
import { CompanyService } from './core/services/company.service';
import { SchoolOrdersHistoryComponent } from './core/modules/dashboards/school-orders-history/school-orders-history.component';
import { SchoolOrdersComponent } from './core/modules/dashboards/school-orders/school-orders.component';
import { SchoolHomeComponent } from './core/modules/dashboards/school-home/school-home.component';
import { OffersComponent } from './core/modules/dashboards/offers/offers.component';
import { OfferEditComponent } from './core/modules/dashboards/offer-edit/offer-edit.component';
import { NewOfferComponent } from './core/modules/dashboards/new-offer/new-offer.component';
import { HomeComponent } from './core/modules/dashboards/home/home.component';
import { HeaderDashboardComponent } from './core/modules/dashboards/header/header.component';
import { FollowersComponent } from './core/modules/dashboards/followers/followers.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
/* component */
import { AppComponent } from './app.component';
import { IndexComponent } from './core/modules/index/index.component';
import { LoginComponent } from './core/modules/login/login.component';
import { SignUpComponent } from './core/modules/sign-up/sign-up.component';
import { HeaderComponent } from './core/modules/header/header.component';
import { FooterComponent } from './core/modules/footer/footer.component';
import { HomeHeaderComponent } from './core/modules/home-header/home-header.component';
import { HomePageComponent } from './core/modules/home-page/home-page.component';
import { SignUpService } from './core/services/sign-up.service';
import { OfferPlatformComponent } from './core/modules/offer-platform/offer-platform.component';
import { RegisterationSuccessComponent } from './core/modules/registeration-success/registeration-success.component';
/* services */
import { AuthGuard } from './core/services/auth.gaurd.service';
import { AuthService } from './core/services/auth.service';
import { GetCompaniesService } from './core/services/get-companies/get-companies.service';
import { AuthInterceptor } from './core/services/auth.interceptor.service';
import { CompanyProfileComponent } from './core/modules/company-profile/company-profile.component';
import { ProfileService } from './core/services/profile/profile.service';
import { MyOrdersComponent } from './core/modules/dashboards/my-orders/my-orders.component';
import { ProfileComponent } from './core/modules/dashboards/profile/profile.component';
import { SchoolFollowersComponent } from './core/modules/dashboards/school-followers/school-followers.component';
import { SchoolHeaderComponent } from './core/modules/dashboards/school-header/school-header.component';
import { SchoolProfileComponent } from './core/modules/dashboards/school-profile/school-profile.component';
import { SchoolSidebarComponent } from './core/modules/dashboards/school-sidebar/school-sidebar.component';
import { SidebarComponent } from './core/modules/dashboards/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { OfferDetailsComponent } from './core/modules/offer-details/offer-details.component';
import { FollowHighlightDirective } from './core/modules/follow-highlight.directive';
import { UIService } from './core/services/ui.service';
import { NewTenderComponent } from './core/modules/dashboards/new-tender/new-tender.component';
import {AmazingTimePickerModule} from "amazing-time-picker";
import { MyTendersComponent } from './core/modules/dashboards/my-tenders/my-tenders.component';
import { ViewTenderComponent } from './core/modules/dashboards/view-tender/view-tender.component';
import { CollectiveTenderComponent } from './core/modules/dashboards/collective-tender/collective-tender.component';
import { UnifyingPlatformComponent } from './core/modules/unifying-platform/unifying-platform.component' ;

import { AdminSidebarComponent } from './core/modules/dashboards/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './core/modules/dashboards/admin-header/admin-header.component';
import { AdminHomeComponent } from './core/modules/dashboards/admin-home/admin-home.component';
import { AdminNewTenderComponent } from './core/modules/dashboards/admin-new-tender/admin-new-tender.component';
import { AdminMyTendersComponent } from './core/modules/dashboards/admin-my-tenders/admin-my-tenders.component';
import { AdminOrdersComponent } from './core/modules/dashboards/admin-orders/admin-orders.component';
import { AdminRequestsComponent } from './core/modules/dashboards/admin-requests/admin-requests.component';
import { AdminHistoryComponent } from './core/modules/dashboards/admin-history/admin-history.component';
import { AdminRequestsViewComponent } from './core/modules/dashboards/admin-requests-view/admin-requests-view.component';
import { AdminOrderViewComponent } from './core/modules/dashboards/admin-order-view/admin-order-view.component' ;
import { PurchasePlatformComponent } from './core/modules/purchase-platform/purchase-platform.component';
import { AdminAllTendersComponent } from './core/modules/dashboards/admin-all-tenders/admin-all-tenders.component';
import { AdminOrderDetailsComponent } from './core/modules/dashboards/admin-order-details/admin-order-details.component';
import { AdminHistoryViewComponent } from './core/modules/dashboards/admin-history-view/admin-history-view.component';
import { AdminTenderInCompanyComponent } from './core/modules/dashboards/admin-tender-in-company/admin-tender-in-company.component';
import { AllCollectiveTendersComponent } from './core/modules/dashboards/all-collective-tenders/all-collective-tenders.component';
import { AdminService } from './core/services/admin.service';
import { PurchasePlatformService } from './core/services/purchase-platform/purchase-platform.service';
import { UnifyingPlatformService } from './core/services/unifying-platform/unifying-platform.service';
import { AdminTenderResolver } from './core/services/admin.tender.resolver';
import { SchoolTenderResolver } from './core/services/school.tender.resolver';
import { AgreeHighlightDirective } from './core/modules/dashboards/agree.highlight.directive';
import { ProgressDirective } from './core/modules/dashboard/progress.directive';
import { PurchaseCategoryComponent } from './core/modules/purchase-category/purchase-category.component';
import { categoryFilterPipe } from './core/modules/purchase-category/category-filter.pipe';
import { RequestDetailsComponent } from './core/modules/request-details/request-details.component';
import { AdminTenderEditComponent } from './core/modules/dashboards/admin-tender-edit/admin-tender-edit.component';
import { AdminTenderEditResolver } from './core/services/admin.tender.edit.resolver';
import { OrderProfileComponent } from './core/modules/dashboards/order-profile-company/order-profile.component';
import { OrderProfileSchoolComponent } from './core/modules/dashboards/order-profile-school/order-profile-school.component';
import { AuthGuardCompany } from './core/services/auth.guard.company.service';
import { AuthGuardSchool } from './core/services/auth.guard.school.service';
import { AuthGuardAdmin } from './core/services/auth.guard.admin.service';
import { UnifyingCatComponent } from './core/modules/unifying-cat/unifying-cat.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { OrderProfileCompanyCpyComponent } from './core/modules/dashboards/order-profile-company-cpy/order-profile-company-cpy.component';
import { OrderProfileSchoolCpyComponent } from './core/modules/dashboards/order-profile-school-cpy/order-profile-school-cpy.component';
import { UserIdleModule } from 'angular-user-idle';
import { SubscribeService } from './core/services/subscribe.service';
import { ArchivedComponent } from './core/modules/dsahboards/archived/archived.component';
import { AdminConsiderViewComponent } from './core/modules/dsahboards/admin-consider-view/admin-consider-view.component';
import { AdminArchiveViewComponent } from './core/modules/dsahboards/admin-archive-view/admin-archive-view.component';
import { ConsideredComponent } from './core/modules/dsahboards/considered/considered.component';
import { AdminParentComponent } from './core/modules/dashboards/admin-parent/admin-parent.component';
import { SchoolParentComponent } from './core/modules/dashboards/school-parent/school-parent.component';
import { CompanyParentComponent } from './core/modules/dashboards/company-parent/company-parent.component';
import { SchoolProfileCpyComponent } from './core/modules/dashboards/school-profile-cpy/school-profile-cpy.component';
import { CompanyProfileCpyComponent } from './core/modules/dashboards/company-profile-cpy/company-profile-cpy.component';
import { NgxEditorModule } from 'ngx-editor';
// import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    HomeHeaderComponent,
    HomePageComponent,
    OfferPlatformComponent,
    InsurancePlatformComponent,
    CompanyProfileComponent,
    FollowersComponent,
    HeaderDashboardComponent,
    HomeComponent,
    MyOrdersComponent,
    NewOfferComponent,
    OfferEditComponent,
    OffersComponent,
    ProfileComponent,
    SchoolFollowersComponent,
    SchoolHeaderComponent,
    SchoolHomeComponent,
    SchoolOrdersComponent,
    SchoolOrdersHistoryComponent,
    SchoolProfileComponent,
    SchoolSidebarComponent,
    SidebarComponent,
    OfferDetailsComponent,
    FollowHighlightDirective,
    AgreeHighlightDirective,
    NewTenderComponent,
    MyTendersComponent,
    ViewTenderComponent,
    CollectiveTenderComponent,
    UnifyingPlatformComponent,
    PurchasePlatformComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminNewTenderComponent,
    AdminMyTendersComponent,
    AdminOrdersComponent,
    AdminRequestsComponent,
    AdminHistoryComponent,
    AdminRequestsViewComponent,
    AdminOrderViewComponent,
    AdminAllTendersComponent,
    AdminOrderDetailsComponent,
    AdminHistoryViewComponent,
    AdminTenderInCompanyComponent,
    RegisterationSuccessComponent,
    AllCollectiveTendersComponent,
    ProgressDirective,
    PurchaseCategoryComponent,
    categoryFilterPipe,
    RequestDetailsComponent,
    AdminTenderEditComponent,
    OrderProfileComponent,
    OrderProfileSchoolComponent,
    UnifyingCatComponent,
    PageNotFoundComponent,
    OrderProfileCompanyCpyComponent,
    OrderProfileSchoolCpyComponent,
    ArchivedComponent,
    AdminConsiderViewComponent,
    AdminArchiveViewComponent,
    ConsideredComponent,
    AdminParentComponent,
    SchoolParentComponent,
    CompanyParentComponent,
    SchoolProfileCpyComponent,
    CompanyProfileCpyComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    AmazingTimePickerModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    NgxEditorModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCtjjapKI6BsU6ow8b-r2xUIHcP6agKuo8'
    // }),
     // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
    // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes) 
    // and `ping` is 120 (2 minutes).
    UserIdleModule.forRoot({idle: 7200, timeout: 1, ping: 10})
  ],
  providers: [
    AuthService,
    AuthGuard,
    SignUpService,
    GetCompaniesService,
    ProfileService,
    CompanyService,
    OfferResolver,
    AuthGuardAdmin,
    AuthGuardCompany,
    ProfileServiceDashboard,
    ProfileResolver,
    SchoolProfileService,
    AuthGuardSchool,
    UIService,
    SchoolTenderResolver,
    AdminTenderResolver,
    SchoolService,
    MyTenderResolver,
    AdminService,
    PurchasePlatformService,
    UnifyingPlatformService,
   
    SubscribeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
