
function loadCloud(){
 const c=getCloudConfig()||{};
 const u=document.getElementById("cloudUrl"),k=document.getElementById("cloudKey");
 if(u)u.value=c.url||""; if(k)k.value=c.anonKey||"";
}
function saveCloud(){
 const url=document.getElementById("cloudUrl").value.trim();
 const anonKey=document.getElementById("cloudKey").value.trim();
 saveCloudConfig({url,anonKey}); toast("Cloud settings saved");
}
async function syncCloud(){
 try{await cloudSyncUp();await cloudSyncDown();toast("Cloud sync complete");}
 catch(e){console.error(e);alert("Cloud sync error: "+e.message)}
}
document.addEventListener("DOMContentLoaded",loadCloud);
