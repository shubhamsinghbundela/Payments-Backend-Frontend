import express from "express";

//This is TypeScript's way of extending Express's Request type globally.
//Normally, Express's Request interface does not have a userId property.
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
