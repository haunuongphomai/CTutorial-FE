import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  AlertModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ProgressModule,
} from '@coreui/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { BlockUIModule } from 'ng-block-ui';
import {
  NbCardModule,
  NbChatModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbThemeModule,
} from '@nebular/theme';
import { ExercisesComponent } from './exercises/exercises.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CodeEditorModule } from '@ngstack/code-editor';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    LandingPageComponent,
    HomePageComponent,
    ExercisesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    AlertModule,
    CarouselModule,
    CollapseModule,
    CardModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    MatProgressSpinnerModule,
    MatListModule,
    FormsModule,
    BlockUIModule.forRoot(),
    NbThemeModule.forRoot(),
    NbChatModule,
    NbLayoutModule,
    NbCardModule,
    NbSpinnerModule,
    MatExpansionModule,
    CodeEditorModule.forRoot(),
    NgCircleProgressModule.forRoot({
      backgroundColor: '#F1F1F1',
      backgroundPadding: -18,
      radius: 60,
      toFixed: 2,
      outerStrokeWidth: 10,
      outerStrokeColor: '#FF6347',
      innerStrokeColor: '#32CD32',
      innerStrokeWidth: 1,
      startFromZero: false,
    }),
    ProgressModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
