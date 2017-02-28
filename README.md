<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/tap-the-number/master/extra/tap_the_number_title.png" width="420"></img>  
<a href=""><img src="https://raw.githubusercontent.com/mmazzarolo/tap-the-number/master/extra/badge-download-on-the-app-store.svg"></img></a>  
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
The project structure I used here may seem over-engineered at first, but this setup paid off almost 
instantly (continue below).

## A bit of history
I started working on this game with a totally different idea in my mind: I wanted to play a bit with 
[React-Native ART](https://github.com/facebook/react-native/tree/master/Libraries/ART), and 
[if you take a closer look at the commit history](https://github.com/mmazzarolo/tap-the-number/commit/9ab03803babecd38d4e320782a0c826623241c4b) 
you'll see that at some point I even implemented an [animation similiar to the Twitter's heart one](http://browniefed.com/blog/react-native-how-to-create-twitter-exploding-hearts/) 
when tapping on a Tile.  
Unfortunately I had to drop the idea because React-Native suffers from small lags when you run 
multiple animations (in my case when tapping on tiles rapidly), but it seems that something is 
changing thanks to [Native Driver](https://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated.html).  
At the time, I had already created the game engine and some components, so, instead of throwing 
away the project, I decided to turn it into this game.

## Interesting stuff
### Config files are your friends
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
This setup, coupled with hot-reloading, came in super handy even for a simple game like this, 
because I've been able to concentrate most of the variables I needed to change in a single 
directory.  

### Relative dimensions  
React-Native is not a game-development framework and one of the things you'll miss a lot, if you'll 
ever try to build a game with it, is a proper way to handle the camera/viewport.  
Tap The Number is a simple game though, so using relative dimensions is more than enough for its 
use case.  
Using relative dimensions means that instead of defining the dimensions of the views using the 
logical pixel units (which is the default unit of React-Native) you should define the dimensions 
relative to the device size (or to their parents).  
Following this approach will make your game resize automatically on bigger/smaller devices (even 
on tablets!) but it also has many drawbacks in my opinion:
- The more the app grows, the more dimensions you'll have to define and keep track of; 
- Handling screen rotation might become difficult (Tap The Game works only in portrait mode)  ;
- If you're using some native components you'll might not be able to resize them  ;

Speacking of dimensions, In Tap The Number I did something that I'm bit ashamed of: I tied the game 
engine to the device size, as you can see in `getRandomTilePosition` of `utils/boardUtils.js`:
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
1. I'm targeting only iOS (>= iPhone 5);  
2. The maxmum number of tiles on the board is 6;  
3. The tile size is 28% of the device width;     

...I decided to opt for this solution for the sake of semplicity (and for keeping the code readable, but feel free to correct me if it seems too unreasonable).    
One last thing, keep in mind that the React-Native `<Text />` component does not scale the text 
based on the device size.  
This is one of the reasons I always use a custom wrapper over the build in `<Text />` component, 
so that I can change its default behaviour / font / color easily.  
To get the scaled font size you should do the following: 
```javascript
const scaledFontSize = Math.round(fontSize * metrics.DEVICE_WIDTH / 375);
```
(Thanks to Facebook F8 app for the trick).  


### MobX (and src/utils) tips
Let's be honest here: I love Redux and I use it daily, but for simple applications like this, MobX is 
more then enough.  
In fact, if you're not interested in middlewares or in having a centralized pattern for dispatching 
action, in my opinion MobX might be a better choice than Redux.  
One thing I just recently started using with MobX is the `provider` + `inject` combo, which provides 
a nice abstraction on connecting components to the store (in a similiar way to the Redux's 
`mapStateToProps`).  
Another thing I've found really useful has been using abusing the `src/utils` and `src/services` folders: 
from my experience the MobX actions tend to get cluttered, so I prefer to keep them easy to read 
by minimizing the verbosity of the code.  
Talking about my utils functions... I'm a bit sad beacuse they are not super pure -- they use the 
`src/config` files internally -- but if your application is bigger than mine I'd advise you to make 
them accepts those configs as parameters to make them testable.  

P.S.: use `@computed` values whenever possibile if you need to compute an observable value 
 (similiarly to Redux's selectors).  

### Animations, part 1: The animations library I used  
In Tap The Number I animated the components in three different ways:

##### React-Native-Animatable
`react-native-animatable` is a wrapper of React-Native Animated API which exposes many simple 
animations and allows you to use them both programmatically and in a declarative way, embracing 
React's philosophy.  
If you don't need complex animations, intepolations or timings, `react-native-animatable` is a solid 
choice.  

##### React-Native Animated API
I used the Animated API for the TimeBar animation in `src/containers/Playground/TimeBar`: I wanted 
to achieve an effect that required some manual tweaking, and the Animated API is the most flexible 
one of the lot.  
Specifically, I wanted to animate the TimeBar width and the TimeBar color from grey to red.  
```javascript
type State = {
  animateValue: any,
};

export default class TimeBar extends Component<void, {}, State> {
  state = {
    animateValue: new Animated.Value(timings.TIME_LIMIT_MS),
  };

  componentDidMount() {
    Animated.timing(this.state.animateValue, {
      duration: timings.TIME_LIMIT_MS,
      easing: Easing.linear, // No easing
      toValue: 0,
    }).start();
  }

  render() {
    // Animate the TimeBar color from grey to red, starting when there are left only 12 seconds
    const backgroundColor = this.state.animateValue.interpolate({
      inputRange: [0, timings.TIME_LIMIT_MS * 0.4, timings.TIME_LIMIT_MS],
      outputRange: ['rgba(255,0,0, 1)', 'rgba(0,0,0, 0.3)', 'rgba(0,0,0, 0.3)'],
    });
    // Animate the TimeBar width from DEVICE_WIDTH to 0 in TIME_LIMIT_MS (which currently is 30 seconds)
    const width = this.state.animateValue.interpolate({
      inputRange: [0, timings.TIME_LIMIT_MS],
      outputRange: [0, metrics.DEVICE_WIDTH],
    });
    return (
      <View style={styles.container}>
        <View style={[styles.content, { width, backgroundColor }]} />
      </View>
    );
  }
}
```  

##### React-Native LayoutAnimation  
LayoutAnimation is a powerfull way to animate the transitions between layout changes without the 
need to specify the animation behaviour.  
You just call `LayoutAnimation.spring()` (or [one of the other available configurations](https://facebook.github.io/react-native/docs/layoutanimation.html)) before calling `setState` and 
React-Native will animate the component that has been subjected to a layout change.  
You can see an example of it in `src/components/Tile.js`, where I animated the tile depth by calling 
`LayoutAnimation.spring()` just before `this.setState({ isTouched: true });`.   
The drawback of LayoutAnimation is, as you may have already guessed, that it provides much less 
control than the other animation alternatives.  

### Animations, part 2: React and animations  
I'll go straight to the point: **In my opinion animations don't get along nicely with React (and 
React-Native), and they never will**.  
I know that it might be a controversial opinion, but having tried many different libraries both on 
React-Native and React (like React-Motion), I still think that animations move against the 
declarative React pattern.  
Don't get me wrong here, you can still achieve a clean code while using small animations, but when 
you'll start linking animations one after another you'll end up doing it programmatically:  
```javascript
_handleButtonPress = async () => {
  this.setState({ disableAllButton: true }); // Prevent pressing buttons while animating
  if (this._headerRef && this._bodyRef) { // Animates out header and body
    await Promise.all([
      this._headerRef.fadeOutLeft(400), 
      this._bodyRef.fadeOutRight(400)
    ]);
  }
  this.props.navigateToNextScreen(); // Animations are ended: move to the next screen
};
```
Otherwise you'll have to keep track of the animations state in your component's state (e.g: 
`this.setState({ isContainerFadingOut: true })` which adds a nice amount of unneeded complexity 
to your component's lifecycle.  

However, I don't think the issue of the imperative nature of animations vs the React 
declarativeness can be solved easily (I'll be super happy to be proved wrong though): after all, 
animating **IS** hard.  

### Android support
I was planning to release this game on Android too at first, but I had some issue that I've not been 
able to solve easily.  
The most important one was my inability to use custom fonts on Android: I tried linking the assets 
folder using `react-native link` (which works perfectly on iOS) and adding the fonts manually, but 
it seems that [some fonts don't link correctly at all](https://github.com/facebook/react-native/issues/7301), while other works perfectly even when using the first method.  
The other issue I faced was a sluggish responsiveness in the animations (specifically when using 
LayoutAnimation), but I guess that I could have easily fixed them by investigating the issue a bit 
more.
  

### Thanks to...
I'm not a creative guy at all: every single thing I used in this application is just a re-iteration 
of stuff I've aldready seen before.  
So, without further ado, here are all the sources I can think of that I used to build this simple 
game:
- [Asset Catalog Creator](https://itunes.apple.com/it/app/asset-catalog-creator-free/id866571115?mt=12) 
for the iOS assets
- [The game background image](https://freeios7.com/download/freeios7.com_apple_wallpaper_geometry-white_ipad_retina.jpg) 
that I've found on Google Images (sorry, I don't know who's the creator)
- [freesound.org](https://freesound.org/browse/tags/sound-effects/) for the sound effects
- [This Slack image](https://raw.githubusercontent.com/mmazzarolo/tap-the-number/master/extra/slack-tiles.png) that inspired the design of the tiles
- And all the libraries I already linked and talked about in this post  
Hope this app example might be helpful :)

