import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ClassManagementService } from 'src/app/services/class-management.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.scss']
})
export class ClassManagementComponent {
  allClassesData: any=[];
  displayedColumns: string[] = ['id', 'name',  'head','floor',"icon"];
  imgSrc: any = {
    infoIcon:'../assets/images/info.svg'
  }
  toggleAddClassFoam=false;
  toggleEditClassFoam=false;
  constructor(private _classService:ClassManagementService,public _commonService:CommonService){}
  ngOnInit(): void {
    this.getAllClasses();
  }
  getAllClasses() {
    this._classService.getClasses().subscribe(({ data, loading }) => {
      console.log(loading);
      this.allClassesData=data.getAllClasses.classes;
    })
  }
  handlePageEvent(event: PageEvent) {
    console.log(event);

  }
  openAddClassFoam(){
this.toggleAddClassFoam=!this.toggleAddClassFoam
  }
  openEditClassFoam(){
this.toggleEditClassFoam=!this.toggleEditClassFoam
  }
}
