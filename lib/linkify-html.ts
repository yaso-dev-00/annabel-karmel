const EMAIL_PATTERN = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
const URL_WITH_PROTOCOL_PATTERN = /(https?:\/\/[^\s<>"']+)/g;
const WWW_PATTERN = /(www\.[^\s<>"']+)/g;

function linkifyText(text: string): string {
  const placeholders: string[] = [];

  function stash(replacement: string) {
    const key = `\x00LINK${placeholders.length}\x00`;
    placeholders.push(replacement);
    return key;
  }

  let result = text;

  result = result.replace(EMAIL_PATTERN, (email) =>
    stash(`<a href="mailto:${email}">${email}</a>`),
  );

  result = result.replace(URL_WITH_PROTOCOL_PATTERN, (url) =>
    stash(`<a href="${url}">${url}</a>`),
  );

  result = result.replace(WWW_PATTERN, (url) =>
    stash(`<a href="https://${url}">${url}</a>`),
  );

  placeholders.forEach((link, index) => {
    result = result.replace(`\x00LINK${index}\x00`, link);
  });

  return result;
}

export function linkifyHtml(html: string): string {
  const tokenRegex = /(<[^>]*>)|([^<]+)/g;
  let insideAnchor = 0;
  let output = "";

  for (const match of html.matchAll(tokenRegex)) {
    const tag = match[1];
    const text = match[2];

    if (tag) {
      if (/^<a[\s>]/i.test(tag)) {
        insideAnchor += 1;
      } else if (/^<\/a>/i.test(tag)) {
        insideAnchor = Math.max(0, insideAnchor - 1);
      }
      output += tag;
    } else if (text) {
      output += insideAnchor > 0 ? text : linkifyText(text);
    }
  }

  return output;
}

export function wrapLegalTables(html: string): string {
  return html
    .replace(/<table(\s[^>]*)?>/gi, '<div class="legalTableScroll"><table$1>')
    .replace(/<\/table>/gi, "</table></div>");
}

export function prepareLegalHtml(html: string): string {
  return wrapLegalTables(linkifyHtml(html));
}
