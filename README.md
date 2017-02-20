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
### React-Native
Tap The Number is built entirely with **React-Native**, which has been an obvious choice for me given 
the fact that I love React and I use it on a daily basis at my current workplace.  
React-Native comes with **Jest**, a test framework that shines when coupled with React (hint hint: 
probably because is used by Facebook to test all their JavaScript applications.)  
Anyway, I didn't put (enough) time on testing on this project... but I still suggest you to try Jest 
because in my opinion it is the simplest testing framework for React applications at the moment 
(I'm sorry, Ava).  
Related dependencies: 
```
"babel-jest": "18.0.0",
"babel-preset-react-native": "1.9.1",
"react": "~15.4.0-rc.4",
"react-native": "0.41.2",
"react-test-renderer": "~15.4.0-rc.4"
```

### MobX
I started this project using Redux, but after a while I notices it was slowing me down for a simple 
project like this, so I seized the opportunity and implemented MobX.  
[This is not the first time I used MobX](https://github.com/GPMDP/google-play-music-desktop-remote), 
but this time I tried using its `provider` and its `inject` a là Redux, and I really liked 
it!   
Related dependencies: 
```
"babel-preset-react-native-stage-0": "1.0.1", // Enables the decorators support
"mobx": "3.1.0",
"mobx-react": "4.1.0",
```

### Development tools
##### Flowtype 
Flowtype is a static type checker, I've been using it for 4 months now and it saved me A LOT of time.  
I can't praise it enough.  
It might be a bit difficult to learn when and where to use it but it is worth the tradeoff, it's one 
of the tools that once mastered you won't be able to work without.  
##### ESlint and Prettier
I wasted way too much time in the past tweaking my ESlint configuration.  
Then, after being influenced by Create React App and it's opinionated approach on limiting the 
configuration options, I discovered Prettier and I was instantly hooked: it you won't be stressed 
anymore about the coding style which is a really good thing.  
#### BABEL



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
