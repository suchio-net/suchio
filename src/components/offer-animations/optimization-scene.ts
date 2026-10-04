export const OPTIMIZATION_RESULT_COUNT = 10;
export const OPTIMIZATION_FLIGHT_DURATION_MS = 1600;
export const OPTIMIZATION_TYPING_DELAY_MS = 18;
export const OPTIMIZATION_RESULTS_DELAY_MS = 280;
export const OPTIMIZATION_FLIGHT_DELAY_MS = 440;

export type OptimizationScene = { typedLength: number; resultsVisible: boolean; flightStarted: boolean; rank: number; complete: boolean };

export function getOptimizationScene(elapsedMs: number, queryLength: number): OptimizationScene {
  const resultsStart = queryLength * OPTIMIZATION_TYPING_DELAY_MS + OPTIMIZATION_RESULTS_DELAY_MS;
  const flightStart = resultsStart + OPTIMIZATION_FLIGHT_DELAY_MS;
  const flightProgress = Math.min(1, Math.max(0, (elapsedMs - flightStart) / OPTIMIZATION_FLIGHT_DURATION_MS));
  return {
    typedLength: Math.min(queryLength, Math.max(0, Math.floor(elapsedMs / OPTIMIZATION_TYPING_DELAY_MS))),
    resultsVisible: elapsedMs >= resultsStart,
    flightStarted: elapsedMs >= flightStart,
    rank: OPTIMIZATION_RESULT_COUNT - Math.round(flightProgress * (OPTIMIZATION_RESULT_COUNT - 1)),
    complete: flightProgress === 1,
  };
}
