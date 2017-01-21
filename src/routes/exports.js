/* RIA/egzamen
 *
 * /src/routes/exports/js - API Routes for exports
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 20/01/2017
*/

import { Router } from "express";

import list from "../controllers/exports/list";
import details from "../controllers/exports/details";
// import create from "../controllers/exports/create";
// import update from "../controllers/exports/update";
// import destroy from "../controllers/exports/destroy";

let oRouter = new Router();

oRouter.get( "/exports", list );
oRouter.get( "/exports/:id", details );
// oRouter.post( "/exports", create );
// oRouter.patch( "/exports", update );
// oRouter.delete( "/exports", destroy );

export default oRouter;
