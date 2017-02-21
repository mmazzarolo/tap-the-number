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
```
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
TO-DO
The structure of the application is the following:
```javascript
src
 ├── app.js // The app entry point (for sake of simplicity I handle here the routing and the state)
 │
 ├── components
 │   ├── CustomButton.js // The button used in the app
 │   ├── CustomTextInput.js // The text input used in the app
 │   └── TouchableView.js // A cross-platform helper view with a touchable behavior
 │
 ├── config
 │   └── metrics.js // App metrics like device width/height, statusbar height, etc...
 │
 ├── containers
 │   ├── AuthScreen
 │   │   ├── index.js // The signup/login screen
 │   │   ├── LoginForm.js // The login form
 │   │   ├── Opening.js // The initial buttons (that redirect to login/signup)
 │   │   └── SignupForm.js // The signup form
 │   └── HomeScreen.js
 │       └── index.js // The post-authentication screen (for this example I simply show a logout button)
 │
 └── images // The app images
```
