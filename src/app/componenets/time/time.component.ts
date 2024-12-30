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
  isVisableIncorrect = false;
  isTimeInOrOutWork = false;
  timeNow= '';
  status = '';
  nameEmp = '';
  inOuttimeNow = new Date().toLocaleTimeString();

  //EmpStatusAttend = false;

  /*------------ Dots ----------------*/
  backVis_1= false;
  backVis_2= false;
  backVis_3= false;
  backVis_4= false;
  backVis_5= false;
  backVis_6= false;
  backVis_7= false;
  /*----------------------------------*/
  empCodes:object = {
    "Mohammed Alfadhel":"6486444",
    "Abdal Rahman":"6506188",
    "Abubaker Majeed":"6506159",
    "Abubaker Mubarak":"6506181",
    "Ahmed Abdelgader":"6505807",
    "Camelia Anwar":"6505722",
    "Duaa Samir":"6541933",
    "Hamza Dabab":"6506168",
    "Hassan Ahmed":"6505830",
    "Khawad Abdalwahab":"6488694",
    "Mohammed Eltahir":"6505887",
    "Nawaf Khames":"6506129",
    "Safa Ahmed":"6505755",
    "Tasnim Elnowairi":"6505977",
    "Youssef Salam":"6505362"
  }

  constructor(
    private http:HttpClient, 
    private clickServer:InOutServiceService){
      
    }

    //Enter code and send to the server to accesses to sage app.
    addDigit(digit: number) {
      
      this.systemInOut();
      //if code still less 6 no action happen
      if (this.enteredCode.length < 7) {
        this.enteredCode.push(digit.toString());
        this.onFillDots(this.enteredCode.length);
      }
  
      //if code equal 6 implement register attend
      if(this.enteredCode.length === 7) {

        const code = this.enteredCode.join('');
        this.clickServer.onClick(code);

        //condition to check in and out.
        this.onMessageInOut(code);
        setTimeout(()=>{
          //Cancel digit arr to start agein with other attend or leave.
          this.onCancel();
          this.isVisableIn = false;
          this.isVisableOut = false;
    
          //dots
          this.backVis_1 = false;
          this.backVis_2 = false;
          this.backVis_3 = false;
          this.backVis_4 = false;
          this.backVis_5 = false;
          this.backVis_6 = false;
          this.backVis_7 = false;
          //
          this.timeNow = '';

          //
          this.nameEmp ='';
        },2000);
      }
    }

    //Cleaning code after enter it to start again.
    onCancel(){
      this.enteredCode = [];
    }

    //End and start working day message.
    systemInOut(){
      const currTime = new Date();
      const t = new Date();
      const startWorkingDay = new Date(t.setHours(9,0,0,0));
      const endWorkingDay = new Date(t.setHours(18,0,0,0));
  
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

    onFillDots(num:number){
      if(num === 1){
        this.backVis_1 = true;
      }else if(num === 2){
        this.backVis_1 = true;
        this.backVis_2 = true;
      }else if(num === 3){
        this.backVis_1 = true;
        this.backVis_2 = true;
        this.backVis_3 = true;
      }else if(num === 4){
        this.backVis_1 = true;
        this.backVis_2 = true;
        this.backVis_3 = true;
        this.backVis_4 = true;
      }else if(num === 5){
        this.backVis_1 = true;
        this.backVis_2 = true;
        this.backVis_3 = true;
        this.backVis_4 = true;
        this.backVis_5 = true;
      }else if(num === 6){
        this.backVis_1 = true;
        this.backVis_2 = true;
        this.backVis_3 = true;
        this.backVis_4 = true;
        this.backVis_5 = true;
        this.backVis_6 = true;
      }else if(num === 7){
        this.backVis_1 = true;
        this.backVis_2 = true;
        this.backVis_3 = true;
        this.backVis_4 = true;
        this.backVis_5 = true;
        this.backVis_6 = true;
        this.backVis_7 = true;
      }
    }

    onMessageInOut(code:string){
      let isExistCode:boolean = Object.values(this.empCodes).includes(code);
      //condition to check in and out.
      if(!isExistCode){
        this.isVisableIncorrect = true;
        setTimeout(()=>{
          //Cancel digit arr to start agein with other attend or leave.
          this.isVisableIncorrect = false;
          },2000)
      }else{
        if(this.clickServer.empStatus){
          
          this.isVisableOut = true;
          for(const [key, value] of Object.entries(this.empCodes)){
            if(value === code){
              console.log(key);
              this.nameEmp = key;
            }
          }
        }else if(!this.clickServer.empStatus){
          this.isVisableIn=true;
          for(const [key, value] of Object.entries(this.empCodes)){
            if(value === code){
              console.log(key);
              this.nameEmp = key;
            }
          }
        }
      }
      
    }


}
