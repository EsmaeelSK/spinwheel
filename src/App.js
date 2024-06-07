import { useContext, useEffect, useState } from 'react';
import Typewriter from "typewriter-effect";

import { context } from './context/context';
import Winwheel from './core/Winwheel'
import './App.css';

import bgImage from "./Assets/images/image.png";
import logo from "./Assets/images/logo.png";
import pic1 from "./Assets/images/5.png";
import pic2 from "./Assets/images/2.png";
import pic3 from "./Assets/images/6.png";
import pic4 from "./Assets/images/10.png";
import tick from "./Assets/audios/tick.mp3";
import win from "./Assets/audios/win.mp3";
import lost from "./Assets/audios/lost.mp3";
import LoginModal from './components/loginModal';

function App() {
  const [round, setRound] = useState(0);
  const [total, setTotal] = useState(0);
  const { setOpenLoginModal, isTyping, setIsTyping, text, setText } =
    useContext(context);

  useEffect(() => {
    if(round === 0) {
      setOpenLoginModal(true);
    } else {
      setOpenLoginModal(false);
    }
  }, [round])

  // Create new wheel object specifying the parameters at creation time.
  let theWheel = new Winwheel({
    outerRadius: 170, // Set outer radius so wheel fits inside the background.
    innerRadius: 50, // Make wheel hollow so segments don't go all way to center.
    textFontSize: 24, // Set default font size for the segments.
    textFontFamily: "farsi",
    // 'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
    textAlignment: "outer", // Align text to outside of wheel.
    numSegments: 15, // Specify number of segments.
    // Define segments including colour and text.
    // drawMode: "image",
    imageOverlay: true,
    drawText: true,
    strokeStyle: "#fff",
    textStyle: "#fff",
    textFillStyle: "#fff",
    segments: [
      // font size and test colour overridden on backrupt segments.
      {
        fillStyle: "#ee1c24",
        text: "10 امتیاز",
      },
      {
        fillStyle: "#3cb878",
        text: "5 امتیاز",
      },
      {
        fillStyle: "#f6989d",
        text: "2 امتیاز",
      },
      {
        fillStyle: "#00aef0",
        text: "20 امتیاز",
      },
      {
        fillStyle: "#f26522",
        text: "1 امتیاز",
      },
      {
        fillStyle: "#000000",
        text: "پوچ",
        textFontSize: 26,
        textFillStyle: "#ffffff",
      },
      {
        fillStyle: "#e70697",
        text: "30 امتیاز",
      },
      {
        fillStyle: "#fff200",
        text: "8 امتیاز",
      },
      {
        fillStyle: "#f6989d",
        text: "25 امتیاز",
      },
      {
        fillStyle: "#ee1c24",
        text: "5 امتیاز",
      },
      {
        fillStyle: "#3cb878",
        text: "15 امتیاز",
      },
      {
        fillStyle: "#f26522",
        text: "1 امتیاز",
      },
      {
        fillStyle: "#a186be",
        text: "10 امتیاز",
      },
      {
        fillStyle: "#000000",
        text: "پوچ",
        textFontSize: 26,
        textFillStyle: "#ffffff",
      },
      {
        fillStyle: "#00aef0",
        text: "12 امتیاز",
      },
      {
        fillStyle: "#ee1c24",
        text: "4 امتیاز",
      },
      {
        fillStyle: "#f6989d",
        text: "22 امتیاز",
      },
      {
        fillStyle: "#f26522",
        text: "6 امتیاز",
      },
      {
        fillStyle: "#3cb878",
        text: "2 امتیاز",
      },
      {
        fillStyle: "#000000",
        text: "پوچ",
        textFontSize: 26,
        textFillStyle: "#ffffff",
      },
      {
        fillStyle: "#a186be",
        text: "600",
      },
      {
        fillStyle: "#fff200",
        text: "700",
      },
      {
        fillStyle: "#00aef0",
        text: "800",
      },
      {
        fillStyle: "#ffffff",
        text: "پوچ",
        textFontSize: 26,
      },
    ],
    // Specify the animation to use.
    animation: {
      type: "spinToStop",
      duration: 10, // Duration in seconds.
      spins: 4, // Default number of complete spins.
      callbackFinished: alertPrize,
      callbackSound: playSound, // Function to call when the tick sound is to be triggered.
      soundTrigger: "pin", // Specify pins are to trigger the sound, the other option is 'segment'.
    },
    // Turn pins on.
    pins: {
      number: 15,
      // fillStyle: "silver",
      outerRadius: 4,
    },
  });

  // Create new image object in memory.
  let loadedImg = new Image();

  // Create callback to execute once the image has finished loading.
  loadedImg.onload = function () {
    theWheel.wheelImage = loadedImg; // Make wheelImage equal the loaded image object.
    theWheel.draw(); // Also call draw function to render the wheel.
  };

  // Set the image source, once complete this will trigger the onLoad callback (above).
  // loadedImg.src = "../Assets/images/spinWheelBackGround.svg";

  // Loads the tick audio sound in to an audio object.
  let audio = new Audio(tick);
  let winAudio = new Audio(win);
  let lostAudio = new Audio(lost);

  // This function is called when the sound is to be played.
  function playSound() {
    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
  }

  // Vars used by the code in this page to do power controls.
  let wheelPower = 1;
  let wheelSpinning = false;

  // -------------------------------------------------------
  // Click handler for spin button.
  // -------------------------------------------------------
  function startSpin() {
    // document.querySelector("#spin_button").disabled = true;
    if ((wheelSpinning = true)) {
      resetWheel();
    }
    theWheel.animation.spins = 4;
    theWheel.startAnimation();

    wheelSpinning = true;
  }

  function tryAgain() {
    document.querySelector(".modal").classList.remove("opened");
    if(document.querySelector(".tryAgainButton").textContent === 'تمام')
      setOpenLoginModal(true);
      
    // document.querySelector("#spin_button").disabled = false;
  }

  // -------------------------------------------------------
  // Function for reset button.
  // -------------------------------------------------------
  function resetWheel() {
    theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); // Call draw to render changes to the wheel.
    wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
  }

  // -------------------------------------------------------
  // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
  // -------------------------------------------------------

  function alertPrize(indicatedSegment) {
    document.querySelector(".modal").classList.add("opened");

    if (indicatedSegment.text == "پوچ") {
      lostAudio.pause();
      lostAudio.currentTime = 0;
      lostAudio.play();
      document.querySelector(".prizeTitle").textContent = "باختی!";
      document.querySelector(
        ".prizePoint"
      ).textContent = `در دایره قسمت ما نقطه تسلیمیم ...`;
      document.querySelector(".modal").style.backgroundColor = "red";
    } else {
      winAudio.pause();
      winAudio.currentTime = 0;
      winAudio.play();
      document.querySelector(".prizeTitle").textContent = "تبریک به تو!";
      document.querySelector(
        ".prizePoint"
      ).textContent = `${indicatedSegment.text} بردی`;
      document.querySelector(".modal").style.backgroundColor = "dodgerblue";
    }
    const result =
      total +
      (indicatedSegment.text === "10 امتیاز"
        ? 10
        : indicatedSegment.text === "30 امتیاز"
        ? 30
        : indicatedSegment.text === "12 امتیاز"
        ? 12
        : indicatedSegment.text === "1 امتیاز"
        ? 1
        : indicatedSegment.text === "15 امتیاز"
        ? 15
        : indicatedSegment.text === "5 امتیاز"
        ? 5
        : indicatedSegment.text === "25 امتیاز"
        ? 25
        : indicatedSegment.text === "8 امتیاز"
        ? 8
        : indicatedSegment.text === "20 امتیاز"
        ? 20
        : indicatedSegment.text === "2 امتیاز"
        ? 2
        : 0);
    setTotal(result)

    setRound(round + 1);
    
    if (round === 3) {
      setTotal(0);
      setRound(0);
      document.querySelector(
        ".totalPoint"
      ).textContent = `امتیاز نهایی: ${total}`;
    } else {
      document.querySelector(".totalPoint").textContent = `امتیاز کل: ${total}`;
    }
  }

  return (
    <>
      <div className="bgPic-container">
        <img src={bgImage} alt="bg" className="bgPic" />
      </div>
      <div className="spinWheel">
        <canvas id="canvas" width="400" height="400">
          <p align="center">
            Sorry, your browser doesn't support canvas. Please try another.
          </p>
        </canvas>
      </div>

      <div className='type'>  
        {isTyping && <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(text)
              .callFunction(() => {
                console.log('String typed out!');
              })
              .pauseFor(2500)
              .deleteAll()
              .callFunction(() => {
                setIsTyping(false);
              })
              .start();
          }}
        />}
      </div>

      <div className="spinButton">
        <button id="spin_button" onClick={startSpin}>
          <img src={logo} alt="logo" />
        </button>
      </div>
      {/* <!-- <div className="spinButton">
            <button id="spin_button" onClick="startSpin();">بِچَرخ</button>
        </div> --> */}

      <div className="modal">
        <div className="content">
          <h1 className="prizeTitle"></h1>
          <h1 className="prizePoint"></h1>
          <h1 className="totalPoint"></h1>
        </div>
        <div className="modalButtons">
          <button className="tryAgainButton" onClick={tryAgain}>
            {round < 2 ? "یه بار دیگه" : round === 2 ? "دورِ آخر" : "تمام"}
          </button>
        </div>
      </div>

      <div className="images">
        <div>
          <img className="img2" src={pic1} alt="behnoush" />
          <img className="img1" src={pic2} alt="behnoush" />
        </div>
        <div>
          <img className="img4" src={pic3} alt="behnoush" />
          <img className="img3" src={pic4} alt="behnoush" />
        </div>
      </div>

      <LoginModal />
    </>
  );
}

export default App;
