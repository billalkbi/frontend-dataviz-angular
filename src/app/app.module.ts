import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NotFoundComponent } from './partials/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ResizableModule } from 'angular-resizable-element';

//users components
import { EditUserDialogComponent } from './components/users/edit-user/edit-user.dialog.component';
import { DeleteUserDialogComponent } from './components/users/delete-user/delete-user.dialog.component';
import { AddUserDialogComponent } from './components/users/add-user/add-user.dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UsersComponent } from './components/users/users.component';
import { FormsModule } from '@angular/forms';

//material importations
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';



//projets importations
import { ProjectsComponent } from './components/projects/projects.component';
import { DeleteProjectDialogComponent } from './components/projects/delete-project-dialog/delete-project-dialog.component';
import { EditProjectDialogComponent } from './components/projects/edit-project-dialog/edit-project-dialog.component';
import { AddProjectDialogComponent } from './components/projects/add-project-dialog/add-project-dialog.component';
import { BubbleChartComponent } from './Charts/bubble-chart/bubble-chart.component';
import { PieChartComponent } from './Charts/pie-chart/pie-chart.component';
import { PieGridChartComponent } from './Charts/pie-grid-chart/pie-grid-chart.component';
import { VerticalBarChartComponent } from './Charts/vertical-bar-chart/vertical-bar-chart.component';
import { HorizontalBarChartComponent } from './Charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { TreeMapChartComponent } from './Charts/tree-map-chart/tree-map-chart.component';
import { NumberCardChartComponent } from './Charts/number-card-chart/number-card-chart.component';
import { GaugeChartComponent } from './Charts/gauge-chart/gauge-chart.component';
import { MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AddGrapheDialogComponent } from './components/dashboard/add-graphe.Dialog/add-graphe.Dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,

    UsersComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    AddUserDialogComponent,

    ProjectsComponent,
    DeleteProjectDialogComponent,
    EditProjectDialogComponent,
    AddProjectDialogComponent,

    HomeComponent,
    DashboardComponent,
    AddGrapheDialogComponent,

    BubbleChartComponent,
    PieChartComponent,
    PieGridChartComponent,
    VerticalBarChartComponent,
    HorizontalBarChartComponent,
    TreeMapChartComponent,
    NumberCardChartComponent,
    GaugeChartComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    NgxChartsModule,
    ResizableModule

  ],
  entryComponents: [
    AddUserDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
