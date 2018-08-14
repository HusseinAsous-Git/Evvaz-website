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
import { OfferPlatformComponent } from './core/modules/home-page/offer-platform/offer-platform.component';

/* services */
import { AuthGuard } from './core/services/auth.gaurd.service';
import { AuthService } from './core/services/auth.service';
import { GetCompaniesService } from './core/services/get-companies/get-companies.service';
import { AuthInterceptor } from './core/services/auth.interceptor.service';
import { UnifyingPlatformComponent } from './core/modules/unifying-platform/unifying-platform.component';
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
    UnifyingPlatformComponent,
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
    FollowHighlightDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SignUpService,
    GetCompaniesService,
    ProfileService,
    CompanyService,
    OfferResolver,
    ProfileServiceDashboard,
    ProfileResolver,
    SchoolProfileService,
    UIService,
    SchoolService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }