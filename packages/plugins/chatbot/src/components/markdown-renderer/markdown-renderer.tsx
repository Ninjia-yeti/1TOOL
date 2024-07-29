import { memo } from 'react';

import Markdown from 'markdown-to-jsx';

import { cn } from '@kit/ui/utils';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownStyles from './markdown-renderer.module.css';

const MemoizedReactMarkdown = memo(
  Markdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
);

export function MarkdownRenderer(
  props: React.PropsWithChildren<{ className?: string; children: string }>,
) {
  return (
    <MemoizedReactMarkdown
      className={cn(props.className, MarkdownStyles.MarkdownRenderer)}
    >
      {props.children}
    </MemoizedReactMarkdown>
  );
}
