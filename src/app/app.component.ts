import { Component, OnInit } from '@angular/core';
import { InOutServiceService } from './services/in-out-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sageApp';
  time:string = '';
  status = '';
  
  constructor(private timingServer:InOutServiceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.timingAndStatus();
  }

  timingAndStatus(){
    let t = new Date();
    const startWorkingDay = new Date(t.setHours(9,0,0,0));
    const endWorkingDay = new Date(t.setHours(18,0,0,0));

    setInterval(() => {
      
      this.time = '';
      this.time = new Date().toLocaleTimeString();
      //to closing date and clickout all users.
       //All emps click out in 18:00
      if(new Date() >= new Date(t.setHours(18,0,0,0)) && new Date() <= new Date(t.setHours(18,0,1,0))){
        this.timingServer.onAllOut();
      }

      //Active and Inactive applicaiton
      if(new Date() >= startWorkingDay && new Date() <= endWorkingDay){
        this.status = 'Active'
      }else{
        this.status = 'Inactive';
       
       
      }

    }, 1000);
  }




  
}
