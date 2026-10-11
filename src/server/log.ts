/** Logs an unexpected failure as structured JSON without request details. */
export function logFailure(event: string, error: unknown) {
  console.error(JSON.stringify({ event, error: error instanceof Error ? error.message : String(error) }));
}
