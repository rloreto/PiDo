const ping = () => {
  //var localDomain = 'localhost';
 var localDomain = 'rpi3.local';

  var fetchObject = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  };

 return fetch("http://ij7376.myfoscam.org/api/app/ping", fetchObject)
 .then((response) => {
   if(response.status===200){
     return "http://ij7376.myfoscam.org";
   } else {
     return fetch("http://" + localDomain + "/api/app/ping", fetchObject)
     .then(response => {
       if(response.status===200){
         return "http://" + localDomain ;
       } else {
         return "";
       }
     })
     .catch((err)=>{
       return "";
     })
   }

 })
 .catch((err)=>{
   return "";
 });
}




export { ping }
