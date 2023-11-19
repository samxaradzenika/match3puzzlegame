import {Game} from "./Game";
import {Tools} from "../system/Tools";

export const Config = {
  loader: Tools.massiveRequire(
    require["context"]("./../../sprites/", true, /\.(mp3|png|jpe?g)$/)
  ),
  scenes: {
    Game: Game,
  },
  board: {
    rows: 8,
    cols: 8,
  },
  combinationRules: [
    [
      {col: 1, row: 0},
      {col: 2, row: 0},
    ],
    [
      {col: 0, row: 1},
      {col: 0, row: 2},
    ],
  ],
  tilesColors: ["blue", "green", "orange", "red", "pink", "yellow"],
};
