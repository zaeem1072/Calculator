export interface PaperFormat {
  id: string;
  name: string;
  grammage: number;
}

export interface PaperSize {
  id: string;
  name: string;
  length: number;
  width: number; 
}

export interface CalculatorState {
  numberOfSheets: number;
  selectedFormat: string;
  selectedSize: string;
  customLength: number; 
  customWidth: number;
  customGrammage: number;
  totalWeight: number;
}

export interface PaperFormats {
  [key: string]: PaperFormat;
}

export interface PaperSizes {
  [formatId: string]: PaperSize[];
}

export const PAPER_FORMATS: PaperFormats = {
  din_a: { id: 'din_a', name: 'DIN A', grammage: 80 },
  din_b: { id: 'din_b', name: 'DIN B', grammage: 90 },
  din_c: { id: 'din_c', name: 'DIN C', grammage: 100 },
  din_d: { id: 'din_d', name: 'DIN D', grammage: 120 },
  // us_format: { id: 'us_format', name: 'US Format', grammage: 75 },
  // jis_b: { id: 'jis_b', name: 'JIS B', grammage: 85 },
  // din_lang: { id: 'din_lang', name: 'DIN LANG', grammage: 80 },
};

export const PAPER_SIZES: PaperSizes = {
  din_a: [
    { id: 'a2', name: 'A2', length: 420, width: 297 },
    { id: 'a3', name: 'A3', length: 297, width: 210 },
    { id: 'a4', name: 'A4', length: 210, width: 297 },
    { id: 'a5', name: 'A5', length: 148, width: 210 },
    { id: 'a6', name: 'A6', length: 105, width: 148 },
  ],
  din_b: [
    { id: 'b2', name: 'B2', length: 500, width: 353 },
    { id: 'b3', name: 'B3', length: 353, width: 250 },
    { id: 'b4', name: 'B4', length: 250, width: 176 },
    { id: 'b5', name: 'B5', length: 176, width: 125 },
  ],
  din_c: [
    { id: 'c4', name: 'C4', length: 229, width: 324 },
    { id: 'c5', name: 'C5', length: 162, width: 229 },
    { id: 'c6', name: 'C6', length: 114, width: 162 },
  ],
  din_d: [
    { id: 'd4', name: 'D4', length: 200, width: 280 },
  ],
  // us_format: [
  //   { id: 'letter', name: 'Letter', length: 216, width: 279 },
  //   { id: 'legal', name: 'Legal', length: 216, width: 356 },
  //   { id: 'tabloid', name: 'Tabloid', length: 279, width: 432 },
  // ],
  // jis_b: [
  //   { id: 'jis_b4', name: 'JIS B4', length: 257, width: 364 },
  //   { id: 'jis_b5', name: 'JIS B5', length: 182, width: 257 },
  // ],
  // din_lang: [
  //   { id: 'dl', name: 'DL', length: 110, width: 220 },
  // ],
};
