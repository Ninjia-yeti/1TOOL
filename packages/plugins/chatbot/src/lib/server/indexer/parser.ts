import parse from 'node-html-parser';

import { createHtmlCleaner } from './html-cleaner';

export function createHTMLDocumentParser() {
  return new HTMLDocumentParser();
}

class HTMLDocumentParser {
  async parse(html: string, host: string) {
    const { Readability } = await import('@mozilla/readability');

    const document = await this.createDocument(html);
    const reader = new Readability(document as unknown as Document);
    const parsed = reader.parse();

    if (!parsed) {
      return {
        title: this.getTitle(html),
        content: '',
      };
    }

    const cleanedContent = this.cleanHtml(parsed.content, host);
    const content = await this.convertToMarkdown(cleanedContent);
    const title = this.getTitle(html) ?? parsed.title;

    return {
      title,
      content,
    };
  }

  private async convertToMarkdown(html: string) {
    const { NodeHtmlMarkdown } = await import('node-html-markdown');

    return NodeHtmlMarkdown.translate(html);
  }

  private async createDocument(html: string) {
    const { Window } = await import('happy-dom');
    const window = new Window();
    const document = window.document;

    document.write(html);

    return document;
  }

  private cleanHtml(content: string, host: string) {
    const cleaner = createHtmlCleaner(content, host);

    return cleaner.clean();
  }

  private getTitle(content: string) {
    const html = parse(content);
    const title = html.querySelector('title');

    return title ? title.rawText : '';
  }
}
