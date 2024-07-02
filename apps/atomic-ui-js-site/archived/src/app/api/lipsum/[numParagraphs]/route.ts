import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import {Buffer} from 'node:buffer';

import Markdown from 'markdown-it';
import {NextResponse} from 'next/server';
import 'server-only';

const markdownRenderer = new Markdown(),

  toNumParagraphs = n => {
    const maybeOut = parseInt(((n ?? '') + '').replace(/\D/g, ''));
    if (Number.isNaN(maybeOut)) return 0;
    return maybeOut;
  };

export async function GET(request: Request, params: { params: { numParagraphs?: string } }) {
  const {params: {numParagraphs: inNumParagraphs}} = params,
    numParagraphs = toNumParagraphs(inNumParagraphs)
  ;

  return new Promise((resolve, reject) => {
    const stream =
        fs.createReadStream(path.join(__dirname, '../../../../../public/md/lipsum.md')),
      reader = readline.createInterface(stream);

    let emptyNewlineCount = 0,
      out = '';

    reader.on('line', line => {
      if (!line) {
        emptyNewlineCount += 1;
      }

      out += line + '\n';

      if (emptyNewlineCount >= numParagraphs) {
        reader.close();
        reader.removeAllListeners();
        resolve(markdownRenderer.render(out.trim()));
      }
    });

    reader.on('error', reject);
  })
    .then(content => new NextResponse(Buffer.from(content as string)));
}
