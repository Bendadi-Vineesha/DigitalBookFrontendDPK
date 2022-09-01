import { Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";

export function getEmailFromToken(){
    const token = localStorage.getItem("digibook_token");
    let authorEmail;
    if(token!=null)
    {
      authorEmail=atob(token!=null?token.split(".")[1]:"");
      authorEmail=JSON.parse(authorEmail)["sub"];      
    }
    return authorEmail;
}

export function isAuthorLoggedIn(){
    const token = localStorage.getItem("digibook_token");
    if(token!=null)
    {
        return true;     
    }
    return false;
}

export function routeToHomePage() {
    const token = localStorage.getItem("digibook_token");
    // router = new  Router();
    if (token==null) {
        // window.location.replace("home");
        
    }
  }


export function availableForRefund(date:String) {
    console.log("availableForRefund");
    
    let d = date.split("-");
    const purchaseDate = new Date();
    purchaseDate.setFullYear(Number(d[0]),Number(d[1]),Number(d[2]));
    console.log(purchaseDate);
    
    const todayDate = new Date();
    console.log(todayDate);
    
    // todayDate=Date.now();
    console.log(" Difference = " , todayDate.valueOf() - purchaseDate.valueOf() > 86400001);

    if(todayDate.valueOf() - purchaseDate.valueOf() > 86400001)
        return false;
    else
        return true;
  }