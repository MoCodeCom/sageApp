import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { InOutServiceService } from 'src/app/services/in-out-service.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {
  dateNow = new Date();
  arr:string[] = [];
  enteredCode: string[] = [];
  isVisableIn = false;
  isVisableOut = false;
  isTimeInOrOutWork = false;
  timeNow= '';

  constructor(
    private http:HttpClient, 
    private clickServer:InOutServiceService){
      
    }


    addDigit(digit: number) {
      this.systemInOut();
      //if code still less 6 no action happen
      if (this.enteredCode.length < 7) {
        this.enteredCode.push(digit.toString());
      }
  
      //if code equal 6 implement register attend
      if(this.enteredCode.length === 7) {
        const code = this.enteredCode.join('');
        this.clickServer.onClick(code);
        this.isVisableIn=true;
        setTimeout(()=>{
          //Cancel digit arr to start agein with other attend or leave.
          this.onCancel();
          this.isVisableIn = false;
          this.timeNow = '';
        },1000);
      }
    }
  
    onCancel(){
      this.enteredCode = [];
    }
  
    onTestTime(){
      const t = new Date();
     
      const startWorkingDay = new Date(t.setHours(9,0,0,0));
      const endWorkingDay = new Date(t.setHours(13,45,0,0));
  
    }
  
    systemInOut(){
      const currTime = new Date();
      const t = new Date();
      const startWorkingDay = new Date(t.setHours(9,0,0,0));
      const endWorkingDay = new Date(t.setHours(17,59,0,0));
  
      if(currTime >= startWorkingDay && currTime <= endWorkingDay
      ){
        this.isTimeInOrOutWork = false;
      }else{
        this.isTimeInOrOutWork = true;
        setTimeout(()=>{
          //Cancel digit arr to start agein with other attend or leave.
          this.onCancel();
          this.isTimeInOrOutWork = false;
          this.timeNow = '';
        },1000);
      }
    }


}
