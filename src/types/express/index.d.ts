// src/types/express/index.d.ts
declare namespace Express {
  export interface Request {
    files?: Express.Multer.File[];
    file?: Express.Multer.File;
  }
}
