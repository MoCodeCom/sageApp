import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class InOutServiceService {
  //private apiKey:string = "fbef847d52076888972bcda709f4cccbede945537a76a4d13f1955f760734cec83b6cbf75bf4817f";
  empStatus = false;

  constructor(private http:HttpClient) { }
  


  empCodes:object = {
    "mohammedAlfadhel":"6486444",
    "abdalrahman":"6506188",
    "abubakerMajeed":"6506159",
    "abubakerMubarak":"6506181",
    "ahmedAbdelgader":"6505807",
    "cameliaAnwar":"6505722",
    "duaaSamir":"6541933",
    "hamzaDabab":"6506168",
    "hassanAhmed":"6505830",
    "khawadAbdalwahab":"6488694",
    "mohammedEltahir":"6505887",
    "nawafKhames":"6506129",
    "safaAhmed":"6505755",
    "tasnimElnowairi":"6505977",
    "youssefSalam":"6505362"
  }

  onClick(code:string){
    // to check the code is exist as employees code!

    const keys = Object.values(this.empCodes);
    for(let i=0;i<keys.length;i++){
      if(code === keys[i]){
    
        let data = Object.entries(this.empCodes).find(([_ , v]) => v === code);
        
        let name = data ? data[0] : "No data"; //name
        //let _time = data ? data[1] : "No data"; //code
        //the date
        let dateIn = new Date().toLocaleDateString('en-GB');

        //the time
        let timeIn = new Date().toLocaleTimeString('en-GB');

        //set data on the local storage
        if(!localStorage.getItem(name)){
          this.onClickIn(name, timeIn);
          this.empStatus = false;
        }else{
          this.onClickOut(dateIn,localStorage.getItem(name),name ,code);
          this.empStatus = true;
        }
      }
    }
    
  }

  onClickIn(name:any, timeIn:any){
    let timeInFormat = timeIn.split(":").slice(0, 2).join(":");
    
 
      let clockIn= `[{"clock_in": "${timeInFormat}","clock_out":""}]`;
      localStorage.setItem(name, clockIn);

    
  }

  onClickOut(dateIn:string, timeIn:any, name:string, code:string){
    let timeOut = new Date().toLocaleTimeString('en-GB');
    let date = new Date().toLocaleDateString();



    let timeInFormat = timeIn.split(":").slice(0, 2).join(":");
    let timeOutFormat = timeOut.split(":").slice(0, 2).join(":");

    //format date
    let [month, day, year] = date.split("/");
    const dateFormat = `${year}/${month}/${day}`;

    this.addingTime(name);
  }

  onClearAll(){
    for(let i=0;i<localStorage.length;i++){
      const key = localStorage.key(i);
    }
  }

  onAllOut(){

    let date = new Date().toLocaleDateString();
    let t = new Date();
    //format date
    let [month, day, year] = date.split("/");
    const dateFormat = `${year}/${month}/${day}`;
    //let arr = ;
    //To out all emps
 
      for(let i=0;i<localStorage.length;i++){
        let key = localStorage.key(i);
        this.addingTime(key,"allOut");
      }

      //To record out in Sage:
      setTimeout(() => {
        this.recordAttend();
      }, 1000);
    
  }

  //to add time clock in / out
  addingTime(name:string, status:string='normal', code:string=''){
    let timeOut = new Date().toLocaleTimeString('en-GB');
    //let date = new Date().toLocaleDateString();

    //let timeInFormat = time.split(":").slice(0, 2).join(":");
    let timeOutFormat = timeOut.split(":").slice(0, 2).join(":");
    //get data from localstorage
    let existData = localStorage.getItem(name);

    //convert data to array
    let arr =[];
    arr = JSON.parse(existData);
    
    //add time out to time in
    let clockOutEmpty = 0; 
    arr.forEach(obj => {
      
    for(let key in obj){
        if(obj[key]===""){
          obj[key] = `${timeOutFormat}`;
          clockOutEmpty++;
        }
    }});


    if(clockOutEmpty === 0 && status==='normal'){
      this.addingNewTime(name);
      //remove old local storage
      
    }


    localStorage.removeItem(name);
    localStorage.setItem(name,JSON.stringify(arr));
    
  }

  addingNewTime(name){
    let arr =[];
    let existData = localStorage.getItem(name);
    let timeIn = new Date().toLocaleTimeString('en-GB');
    let timeInFormat = timeIn.split(":").slice(0, 2).join(":");
    
    arr = JSON.parse(existData);
    arr.push({"clock_in": `${timeInFormat}`,"clock_out":""});


   
    localStorage.removeItem(name);
    setTimeout(() => {
      localStorage.setItem(name, JSON.stringify(arr));
    }, 500);
    
  }

  recordAttend(){
    let date = new Date().toLocaleDateString();
    let [month, day, year] = date.split("/");
    const dateFormat = `${year}/${month}/${day}`;

    for(let i in this.empCodes){
      let timeArr = localStorage.getItem(i);
      let empCode = this.empCodes[i];

      
      if(timeArr !== null){

        let jsonString = timeArr;
        let timeArray = JSON.parse(jsonString);

        this.http.post(`https://altras.sage.hr/api/timesheets/clock-in`,
          {
            "override": "true",
            "clocked_time": {
            [dateFormat]: {
            [empCode]: timeArray
                 }
               }
             }
        , {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Auth-Token': "fbef847d52076888972bcda709f4cccbede945537a76a4d13f1955f760734cec83b6cbf75bf4817f"
          })}
        ).subscribe({
          next: (response) => {
            console.log('Response:', response);
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      }
      
    }

    localStorage.clear();
  }
}

