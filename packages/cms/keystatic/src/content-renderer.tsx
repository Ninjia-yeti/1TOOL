export function KeystaticContentRenderer(props: { content: unknown }) {
  return <div dangerouslySetInnerHTML={{ __html: props.content as string }} />;
}
