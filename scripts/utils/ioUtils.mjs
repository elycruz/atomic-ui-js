import fs from 'fs';

export const

  ioReadDirectory = fs.promises.readdir,

  ioReadFile = fs.promises.readFile,

  ioFileAccess = fs.promises.access,

  ioStat = fs.promises.stat,

  ioWriteFile = fs.promises.writeFile,

  ioFileExists = filePath => ioFileAccess(filePath, fs.constants.F_OK),

  canWriteFileIo = filePath => ioFileAccess(filePath, fs.constants.W_OK),

  canReadFileIo = filePath => ioFileAccess(filePath, fs.constants.R_OK),

  canReadAndExistsFileIo = filePath => ioFileAccess(filePath, fs.constants.R_OK),

  canReadAndWriteFileIo = filePath =>
    ioFileAccess(filePath, fs.constants.R_OK | fs.constants.W_OK),

  ioExecuteAndPassThrough = (fn, ...args) => fn(...args)
    .then(() => args, err => {
      console.log(err);
      return args;
    })

  ;
