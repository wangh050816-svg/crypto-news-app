// 一個 1080×1080 的「安全舞台」放所有重點內容；各比例只決定舞台放在哪、放多大（skill：重點放中央 1:1 方塊內）
export type Aspect = "9x16" | "1x1" | "16x9";
export const ASPECTS: Record<Aspect, {w: number; h: number; stageY: number; stageScale: number}> = {
  "9x16": {w: 1080, h: 1920, stageY: 340, stageScale: 1.0},  // 上 14%、下 1/3 留給平台 UI
  "1x1": {w: 1080, h: 1080, stageY: 0, stageScale: 1},
  "16x9": {w: 1920, h: 1080, stageY: 0, stageScale: 1},
};
