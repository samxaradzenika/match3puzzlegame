import * as PIXI from "pixi.js";

import {App} from "../system/App";
import {Scene} from "../system/Scene";
import {Board} from "./Board";
import {CombinationManager} from "./CombinationManager";

export class Game extends Scene {
  create() {
    this.container = new PIXI.Container();
    this.createBackground();

    this.board = new Board();
    this.container.addChild(this.board.container);

    this.board.container.on("tile-touch-start", this.onTileClick.bind(this));

    this.combinationManager = new CombinationManager(this.board);
  }

  onTileClick(tile) {
    if (this.disabled) {
      return;
    }

    if (this.selectedTile) {
      if (!this.selectedTile.isNeighbour(tile)) {
        this.clearSelection(tile);
        this.selectTile(tile);
      } else {
        this.swap(this.selectedTile, tile);
      }
    } else {
      this.selectTile(tile);
    }
  }

  selectTile(tile) {
    this.selectedTile = tile;
    this.selectedTile.field.select();
  }
  swap(selectedTile, tile) {
    this.disabled = true; // lock the board to prevent tiles from moving again while the animation is already running
    this.clearSelection(); // hide the "field-selected" frame from the field of the selectedTile object
    selectedTile.sprite.zIndex = 2; // place the selectedTile sprite one layer higher than the tile sprite

    selectedTile.moveTo(tile.field.position, 0.2); // move selectedTile to tile position
    // move tile to electedTile position
    tile.moveTo(selectedTile.field.position, 0.2).then(() => {
      // after motion animations complete:
      // change the values of the field properties in the tile objects
      // change the values of the tile properties in the field objects
      this.board.swap(selectedTile, tile);
      this.disabled = false; // unlock the board
    });
  }

  clearSelection() {
    if (this.selectedTile) {
      this.selectedTile.field.unselect();
      this.selectedTile = null;
    }
  }
  createBackground() {
    this.bg = App.sprite("bg");
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }
}
