import { gamesData } from "../../../../data.js";
import { loadingAllImages } from '../../../../core/js/helpers/utils.js';

let timbermanAssetsData = gamesData[3].assets;

let loadedImages = loadingAllImages(timbermanAssetsData);

const backgroundImage = loadedImages['background'];

const logPile = loadedImages['log-pile'];

const redPlayer = [
    loadedImages['red-idle'],
    loadedImages['red-jump']
];

const bluePlayer = [
    loadedImages['blue-idle'],
    loadedImages['blue-jump']
];

const redObstacles = [
    loadedImages["obstacle-1"],
    loadedImages["obstacle-8"],
    loadedImages["obstacle-7"],
    loadedImages["obstacle-6"],
    loadedImages["obstacle-5"],
    loadedImages["obstacle-4"],
    loadedImages["obstacle-3"],
    loadedImages["obstacle-2"],
];

const blueObstacles = [
  loadedImages["obstacle-1"],
  loadedImages["obstacle-2"],
  loadedImages["obstacle-3"],
  loadedImages["obstacle-4"],
  loadedImages["obstacle-5"],
  loadedImages["obstacle-6"],
  loadedImages["obstacle-7"],
  loadedImages["obstacle-8"],
];


export const imageList = () => {
    return {
        background : backgroundImage,
        logPile : logPile,
        redPlayer : redPlayer,
        bluePlayer : bluePlayer,
        redObstacles : redObstacles,
        blueObstacles : blueObstacles
    }
}