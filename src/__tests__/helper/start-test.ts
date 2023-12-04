import axios from 'axios';
import 'dotenv/config';
import { TinyRequestInstance } from '../../request-lib';
import { RequestLib } from '../../enums';

export class StartTest {
    constructor() {
        
    }

    getRequest() {
        return TinyRequestInstance(RequestLib.axios, axios, process.env.GITEE_TOKEN as string);
    }
}