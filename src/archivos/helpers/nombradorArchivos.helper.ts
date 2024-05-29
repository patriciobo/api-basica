import { v4 as uuid } from 'uuid';

export const nombradorArchivos = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  const extension = file.mimetype.split('/')[1];

  const nombreArchivo = `${uuid()}.${extension}`;

  callback(null, nombreArchivo);
};
