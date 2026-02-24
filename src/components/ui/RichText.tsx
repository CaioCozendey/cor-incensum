import React from 'react';

interface RichTextProps {
  text: string;
  className?: string;
}

// Renders inline tokens: **bold** and ^^CAPS^^
function renderInline(line: string, key: string | number): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Split on **...** and ^^...^^
  const regex = /(\*\*[^*]+\*\*|\^\^[^^]+\^\^)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > last) {
      parts.push(line.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(
        <strong key={`b-${match.index}`} className="font-bold">{token.slice(2, -2)}</strong>
      );
    } else if (token.startsWith('^^')) {
      parts.push(
        <span key={`c-${match.index}`} className="uppercase tracking-widest">{token.slice(2, -2)}</span>
      );
    }
    last = match.index + token.length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <React.Fragment key={key}>{parts}</React.Fragment>;
}

export default function RichText({ text, className = '' }: RichTextProps) {
  const lines = text.split('\n');

  return (
    <div className={`space-y-1 ${className}`}>
      {lines.map((rawLine, i) => {
        // Divider
        if (rawLine.trim() === '---') {
          return (
            <div key={i} className="flex items-center gap-3 my-3">
              <span className="flex-1 h-px bg-gold-400/40 dark:bg-gold-600/30" />
              <span className="text-gold-500 text-xs">✦</span>
              <span className="flex-1 h-px bg-gold-400/40 dark:bg-gold-600/30" />
            </div>
          );
        }

        // Empty line → spacer
        if (rawLine.trim() === '') {
          return <div key={i} className="h-3" />;
        }

        // Detect prefix tags
        let line = rawLine;
        let sizeClass = 'text-base leading-loose';
        let alignClass = 'text-left';
        let extraClass = '';

        const tagMatch = line.match(/^\{(center|large|small|title)\}/);
        if (tagMatch) {
          const tag = tagMatch[1];
          line = line.slice(tagMatch[0].length);
          if (tag === 'center') alignClass = 'text-center';
          if (tag === 'large') sizeClass = 'text-xl leading-loose';
          if (tag === 'small') sizeClass = 'text-sm leading-relaxed';
          if (tag === 'title') {
            sizeClass = 'text-2xl leading-snug';
            extraClass = 'font-serif font-semibold text-crimson-800 dark:text-parchment-100 mt-3 mb-1';
          }
        }

        return (
          <p
            key={i}
            className={`${sizeClass} ${alignClass} ${extraClass} font-body text-marian-800 dark:text-parchment-200`}
          >
            {renderInline(line, i)}
          </p>
        );
      })}
    </div>
  );
}
