import fs from "fs";
import {parse} from "csv-parse/sync";
export class CSVHelper{

    static readCSV(filePath: string): Record<string,string>[]{  // record is like a map
        return parse(fs.readFileSync(filePath, "utf-8"),{
            columns:true, //first row as headers
            skip_empty_lines: true,
            trim: true,

        })

    }
}