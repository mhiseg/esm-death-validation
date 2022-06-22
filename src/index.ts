
import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";

 const importTranslation = require.context(
   "../translations",
   false,
   /.json$/,
   "lazy"
 );
 

 function setupOpenMRS() {
   const moduleName = "@mhiseg/esm-death-validation-app";
 
   const options = {
     featureName: "validation",
     moduleName,
   };
 
 
   return {
     pages: [
       {
         load: getAsyncLifecycle(() => import("./root.component"), options),
         route: "death/validate/patient",
         privilege: "App: death.doctor"
       },
     ]
   };
 }
 
 export {importTranslation, setupOpenMRS };
 