export function Code({
  code,
  showLines,
}: {
  code: { raw: string; processed: string };
  showLines: boolean;
}) {
  return (
    <div
      className={`${showLines ? "lines" : ""}`}
      dangerouslySetInnerHTML={{ __html: code.processed }}
    ></div>
  );
}
