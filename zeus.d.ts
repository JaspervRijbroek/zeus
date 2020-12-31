import { Debugger } from "debug";

declare namespace NodeJS {
    interface Global {
        debug: Debugger;
    }
}