interface ChangingFile {
    path: string;
    changes: number;
  }
  
  interface TopChangingFilesProps {
    files: ChangingFile[];
  }
  
  export default function TopChangingFiles({
    files,
  }: TopChangingFilesProps) {
    return (
      <div className="rounded-xl border p-5">
        <h3 className="font-semibold">Most frequently changed files</h3>
  
        <div className="mt-4 space-y-4">
          {files.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No file metrics available.
            </p>
          ) : (
            files.map((file) => (
              <div
                key={file.path}
                className="flex items-center justify-between gap-4"
              >
                <code className="truncate text-sm">{file.path}</code>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {file.changes} changes
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }