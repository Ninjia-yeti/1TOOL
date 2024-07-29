import { parse } from 'node-html-parser';

export function createHtmlCleaner(html: string, host: string) {
  return new HtmlCleaner(html, host);
}

class HtmlCleaner {
  private readonly html: string;
  private readonly host: string;

  constructor(html: string, host: string) {
    this.html = html;
    this.host = host;
  }

  clean() {
    const html = parse(this.html);
    const host = this.host;
    const links = html.querySelectorAll('a');
    const images = html.querySelectorAll('img');

    links.forEach((link) => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');

      const href = link.getAttribute('href');

      // if the link is relative, make it absolute
      if (href?.startsWith('/')) {
        link.setAttribute('href', `${host}${href}`);
      }
    });

    images.forEach((image) => {
      const src = image.getAttribute('src');

      if (!src) {
        return;
      }

      if (src?.startsWith('/')) {
        image.setAttribute('src', `${host}${src}`);
      }
    });

    return html.innerHTML;
  }
}
