import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InOutServiceService {

  constructor() { }
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

    console.log(keys);
    for(let i=0;i<keys.length;i++){
      if(code === keys[i]){
    
        let data = Object.entries(this.empCodes).find(([_ , v]) => v === code);
        console.log(data);
        let name = data ? data[0] : "No data"; //name
        let _time = data ? data[1] : "No data"; //code
        //the date
        let dateIn = new Date().toLocaleDateString('en-GB');

        //the time
        let timeIn = new Date().toLocaleTimeString('en-GB');

        
        if(!localStorage.getItem(name)){
          localStorage.setItem(name, timeIn);
          
        }else{
          console.log(localStorage.getItem(name));
          this.onClickOut(dateIn,localStorage.getItem(name), name);
        }

        
        
      }
    }
    
  }

  onClickOut(dateIn:string, timeIn:any, name:string){
    let timeOut = new Date().toLocaleTimeString('en-GB');
   
    console.log({"timeIn":timeIn, "timeOut":timeOut, "date":dateIn , name})
    localStorage.removeItem(name);
  }

  onClearAll(){
    for(let i=0;i<localStorage.length;i++){
      const key = localStorage.key(i);
      //localStorage.removeItem(key || "");
    }
  }

  onEndDay(targetTime:string):void{

    //the target time : 11:40
    const [targetHours, targetMinutes] = targetTime.split(':').map(num => parseInt(num, 10));
    // Set an interval to check the current time every minute (60000 ms);
    // Get the current time
  const now = new Date();

  // Set the target time today
  const targetDate = new Date(now.setHours(targetHours, targetMinutes, 0, 0));

  // Calculate the time difference between now and the target time
  let timeDifference = targetDate.getTime() - now.getTime();

  // If the target time is already past today, schedule it for tomorrow
  if (timeDifference < 0) {
    targetDate.setDate(targetDate.getDate() + 1); // Move target time to the next day
    timeDifference = targetDate.getTime() - now.getTime(); // Recalculate the difference for tomorrow
  }

  // Schedule the task to clear localStorage at the target time
  setTimeout(() => {
    //localStorage.clear();
    //this.onClearAll();
    console.log('LocalStorage cleared automatically at ' + targetTime);
  }, timeDifference);
  }
}
