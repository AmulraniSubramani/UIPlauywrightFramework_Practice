
import XLSX from 'xlsx';

export class ExcelHelper {
    
    static readExcel(filepath: string, sheetname?: string): Record<string, string>[] {
        const workbook = XLSX.readFile(filepath);
        const sheet = workbook.Sheets[sheetname || workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json<Record<string, string>>(sheet);
    }
}