<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/tap-the-number/master/extra/tap_the_number_title.png" width="420"></img>  
</p>

Tap The Number is a simple React-Native game where you have to tap the tiles that appear on the screen in a specific order.  
Even if developing this game didn't take too much time (I should have put in it ~20 hours I guess) it has been a fun ride and I'd like to share some tips and some info on the complexities I found in its development.   
But first...  

## Screenshots!
<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/tap-the-number/master/extra/screenshot-iphone6plus-1.png" width="240"></img>
<img src="https://raw.githubusercontent.com/mmazzarolo/tap-the-number/master/extra/screenshot-iphone6plus-2.png" width="240"></img>    
<img src="https://raw.githubusercontent.com/mmazzarolo/tap-the-number/master/extra/screenshot-iphone6plus-3.png" width="240"></img>    
</p>  

## The stack and the dependencies
#### React-Native
Tap The Number is built entirely with [**React-Native**](https://facebook.github.io/react-native/), 
which has been an obvious choice for me given the fact that I love React and I use it on a daily 
basis at my current workplace.  
React-Native comes with [**Jest**](https://facebook.github.io/jest/), a test framework that shines 
when coupled with React.  
Related dependencies: 
```json
"babel-jest": "18.0.0",
"babel-preset-react-native": "1.9.1",
"react": "~15.4.0-rc.4",
"react-native": "0.41.2",
"react-test-renderer": "~15.4.0-rc.4"
```

#### State management: MobX
I started this project with [**Redux**](http://redux.js.org/docs/introduction/), but after a while I 
noticed it was slowing me down for a simple project like this, so I seized the opportunity and 
implemented [**MobX**](https://github.com/mobxjs/mobx).  
[This is not the first time I used MobX](https://github.com/GPMDP/google-play-music-desktop-remote), 
but this time I tried using its `provider` and its `inject` a là Redux, and I really liked 
it!   
Related dependencies: 
```json
"babel-preset-react-native-stage-0": "1.0.1", // Enables the decorators support
"mobx": "3.1.0",
"mobx-react": "4.1.0",
```

#### Static type checking: Flowtype 
[**Flowtype**](https://flowtype.org/) is a static type checker.  
I've been using it for a while now and it saved me A LOT of time. I can't praise it enough.  
Give it a try, or better still stick with it for some days for seeing its real benefits.  
Related dependencies: 
```json
"flow-bin": "0.37.4",
"babel-plugin-transform-flow-strip-types": "6.22.0",
```

#### Linting: ESlint and Prettier
I wasted way too much time in the past tweaking my ESlint configuration.  
Now I'm super happy with a minimal ESlint config and with 
[**Prettier**](https://github.com/prettier/prettier), which takes care of all the code styling of 
my application.  
Related dependencies: 
```json
"babel-eslint": "7.1.1",
"eslint": "3.15.0",
"eslint-plugin-prettier": "2.0.0",
"eslint-plugin-react-app": "1.0.2",
"prettier": "0.16.0",
```

#### Importing from absolute path: babel-plugin-module-resolver
I use [**babel-plugin-module-resolver**](https://github.com/tleunen/babel-plugin-module-resolver) 
for importing files from the `src` path. 
Related dependencies: 
```json
"babel-plugin-module-resolver": "2.5.0", 
```

#### Playing audio files: react-native-sound
If you need to play an audio file in a React-Native application you must use some kind of external 
library at the moment because it is not (yet) implement in React-Native out of the box.  
To me [**react-native-sound**](https://github.com/zmxv/react-native-sound) is currently the most 
complete library at the moment and it worked fine on this application.  
P.S.: I'm pulling the library directly from its Github Master branch because the latest version
available on NPM does not support React-Native 0.40 yet.  
Related dependencies: 
```json
"react-native-sound": "git+https://github.com/zmxv/react-native-sound.git",
```

#### Simple animations: react-native-animatable
For simple animations [**react-native-animatable**](https://github.com/oblador/react-native-animatable) 
is the de-facto standard on React-Native.  
Related dependencies: 
```json
"react-native-animatable": "1.1.0",
```

## Project structure 
The structure of the application and all its files are the following:
```javascript
src
 ├── index.js // The app entry point
 │
 ├── assets // audio & fonts that must be linked in the app
 │
 ├── components
 │   ├── CustomText.js // A wrapper on the text used in the entire app (responsive + custom font)
 │   ├── Tile.js // The tile component used in the home screen and in the playground
 │   └── TouchableView.js // A cross-platform helper view with a touchable behavior
 │
 ├── config
 │   ├── colors.js // Colors (the available tiles colors, etc...)
 │   ├── env.js // Platform specific variables (IS_ENV_DEVELOPMENT, IS_ANDROID, etc...)
 │   ├── metrics.js // App metrics (DEVICE_WIDTH, TILE_SIZE, etc...)
 │   └── timings.js // Timing specific variables (TIME_LIMIT_MS, etc...)
 │
 ├── containers
 │   ├── App // The root app screen, routing is handled here
 │   ├── Endgame // The post-game screen (with the score and restart button)
 │   ├── Home // The home screen (with the start game button)
 │   └── Playground // The screen where the game runs
 │       ├── Board // The board game, renders the tiles
 │       ├── BoardTile // A Tile with Board-specific behaviors
 │       └── TimeBar // The top-bar with that shows the remaining time
 │
 ├── images // The app images
 │
 ├── services
 │   └── audio.js // Simple wrapper over react-native-sound 
 │
 ├── stores // MobX stores
 │   ├── game.js // All the app logic is handled here (Board setup, scoring, etc...)
 │   └── router.js // A super simple router 
 │
 ├── types // Flowtype types
 │
 └── utils
     ├── boardUtils.js // Board setup utils (getRandomTilePosition, getRandomNumber, etc...)
     ├── colorUtils.js // Color utils (getDifferentLuminance, etc...)
     └── timeUtils.js // Simple timing helpers (mostly wrappers over setTimeout)
```
The project structure I used here may seems over-engineered at first, but this setup paid off almost 
instantly (continue below).


## A bit of history
To-Do

## Interesting stuff
#### Config files are your friends
I tried to gather all the variables that describe the app behaviour in the `config` directory.  
The `config/metrics.js` for example exposes all the application dimensions:  
```javascript
/* @flow */
import { Dimensions, Platform } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const { height, width } = Dimensions.get('window');

const ANDROID_STATUSBAR = 24;
const DEVICE_HEIGHT = IS_ANDROID ? height - ANDROID_STATUSBAR : height;
const DEVICE_WIDTH = width;

const TILE_SIZE = DEVICE_WIDTH * 0.28;
const TILE_SHADOW_DEPTH = 6;
const TILE_BORDER_RADIUS = TILE_SIZE * 0.1;

const BOARD_MARGIN = 20;
const BOARD_HEIGHT = DEVICE_HEIGHT * 0.96;
const BOARD_WIDTH = DEVICE_WIDTH;

export default {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  TILE_SIZE,
  TILE_SHADOW_DEPTH,
  TILE_BORDER_RADIUS,
  BOARD_MARGIN,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TIME_BAR_HEIGHT: DEVICE_HEIGHT * 0.02,
};
``` 
This setup, coupled with the hot-reloading, came in super handy even for a simple game like this, 
because I've been able to concentrate most of the variables I needed to change in a single 
directory.

#### Relative dimensions  
React-Native is not a game-development framework, so one of the things you'll miss most is a proper 
way to handle the camera/viewport.  
Tap The Number is a simple game though, so using relative dimensions is more than enough for this 
use case.  
Using relative dimensions means that instead of defining the dimensions of the views using the 
logical pixel units (which is the default unit of React-Native) you should define the dimensions 
relative to the device size (or to their parents).  
Following this approach will make your game resize automatically on bigger/smaller devices (even 
on tablets!) but has many drawbacks in my opinion:
- The more the app grows, the more dimensions you'll have to define and keep track of  
- Handling screen rotation might become difficult (Tap The Game works only in portrait mode)  
- If you're using some native components you'll might not be able to resize them  

In Tap The Number I also did something that I'm bit ashamed of: I tied the game engine to the 
device size, as you can see in `getRandomTilePosition` of `utils/boardUtils.js`:
```javascript
/**
 * Gets a random tile position (making sure that it does not overlap another tile).
 * @param {Array<Tile>} blacklist - An array the already placed tiles.
 * @return {Object} An object with the x and y coordinates of the tile.
 */
const getRandomTilePosition = (board: Array<Tile>): { x: number, y: number } => {
  const position = {};
  const boardOriginX = metrics.BOARD_MARGIN;
  const boardOriginY = metrics.BOARD_MARGIN;
  const boardWidth = metrics.BOARD_WIDTH - metrics.BOARD_MARGIN;
  const boardHeight = metrics.BOARD_HEIGHT - metrics.BOARD_MARGIN;
  // Gets random tile positions until it finds a position that does not overlap another tile.
  // The while loop is a bit scary but we don't have to worry: we're using relative metrics
  // and we're limiting the number of tiles.
  while (true) {
    const randomX = random(boardOriginX, boardWidth - metrics.TILE_SIZE);
    const randomY = random(boardOriginY, boardHeight - metrics.TILE_SIZE);
    if (_isPositionAvailable(randomX, randomY, board)) {
      position.x = randomX;
      position.y = randomY;
      break;
    }
  }
  return position;
};
```
When the app initializes the game board the above function searches for available tiles positions 
using a while-loop.  
I'm aware that this function [can be optimized in many different ways](http://jsfiddle.net/fZtdt/13/), 
and that it can break if the device has a weird width / height ratio, but considering that:
1. I'm targeting only iOS (>= iPhone 5)
2. The maxmum number of tiles on the board is 6
3. The tile size is 28% of the device width  

...I decided to opt for this solution for the sake of semplicity (and for keeping the code readable).  

One last thing, keep in mind that the React-Native `<Text />` component does not scale the text 
based on the device size.  
This is on of the reasons I always use a custom wrapper over the build in `<Text />` component, 
so that I can change its default behaviour / font / color easily.  
To get the scaled font size you should do the following: 
```javascript
const scaledFontSize = Math.round(fontSize * metrics.DEVICE_WIDTH / 375);
```
(Thanks to Facebook F8 app for the trick).  


#### MobX tips
TO-DO
1. Using utils for small functions instead of writing them in the MobX stores makes the stores super
easy to read and reason about.  
2. 
2. PURE utils nooooo