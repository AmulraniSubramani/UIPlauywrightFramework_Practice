
 import fs from 'fs';
import { json } from 'stream/consumers';

export class JsonHelper{

    static readJson(filePath: string): Record<string,string>[] {

        return JSON.parse(fs.readFileSync (filePath, 'utf-8'));
    }
}