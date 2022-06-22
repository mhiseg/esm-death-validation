
import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
//  import { configSchema } from "./config-schema";
 
 /**
  * This tells the app shell how to obtain translation files: that they
  * are JSON files in the directory `../translations` (which you should
  * see in the directory structure).
  */
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
 
  //  defineConfigSchema(moduleName, configSchema);
 
   return {
     pages: [
       {
         load: getAsyncLifecycle(() => import("./root.component"), options),
         route: "death/patient/validate",
       },
     ]
   };
 }
 
 export {importTranslation, setupOpenMRS };
 