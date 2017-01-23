/* RIA/egzamen
 *
 * /src/routes/pages.js - Pages routes
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 22/01/2017
*/

import { Router } from "express";
import homepageController from "../controllers/pages/home.js";

let oRouter = new Router();

oRouter.get( "/", homepageController );

export default oRouter;
