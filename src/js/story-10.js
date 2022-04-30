startStory10();

// TODO: Show the document after the audio has been loaded
function startStory10() {
  // Trigger the modal of info
  // noinspection DuplicatedCode
  setTimeout(() => {
    // document.getElementById(`10-mt`).click(); // TODO: Activate this
  }, 150);

  // Define extensions as variable
  let mp3Extension = `.mp3`;

  // Get document elements
  let modalButton = document.getElementById(`10-y`);
  let fadeInLines = Array.from(document.getElementsByClassName(`10-fil`));
  let fadeInGraphicsOfSolo = Array.from(
      document.getElementsByClassName(`10-gos`));
  let line1 = document.getElementById(`10-l-1`);
  let line2 = document.getElementById(`10-l-2`);
  let divOfSoloAndGraphics = document.getElementById(`10-sag`);
  let postSoloDivs = document.getElementById(`10-psd`);

  // Specify pseudo-constants
  let audioSrc = `audios/`;
  let colourLight = `#ffffff`;
  let colourDark = `#212529`; // Bootstrap dark colour
  let transitionTimeInMS = 500; // TODO: Make this 2000
  let transitionSpeedCurve = `linear`;
  let appearanceTimeOfLine1 = 500;
  let appearanceTimeOfLine2 = appearanceTimeOfLine1 + transitionTimeInMS;
  let startOfSoloAndGraphics = appearanceTimeOfLine2 + transitionTimeInMS;
  let numberOfStepsInSolo = 24;

  // Calculate other derivative variables
  let soloPath = audioSrc + `story-10` + mp3Extension;
  let solo = new Audio(soloPath);

  // Process the fade-in lines
  fadeInLines.forEach(line => {
    line.style.color = colourLight;
    line.style.transition = `color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
  });

  // Process the images
  fadeInGraphicsOfSolo.forEach(graphic => {
    graphic.style.opacity = `0`;
    graphic.style.transition = `opacity ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
  });

  // Process the post solo div
  postSoloDivs.style.opacity = `0`;
  postSoloDivs.style.transition = `opacity ${transitionTimeInMS}ms ${transitionSpeedCurve}`;

  // Add event listener for the modal button
  modalButton.addEventListener(`click`, readerIsOkay);
  modalButton.click(); // TODO: Remove this debug click

  // When reader presses okay in the modal, show them the story
  function readerIsOkay() {
    // Remove the event listener
    modalButton.removeEventListener(`click`, readerIsOkay);

    // When the solo has been loaded upto a substantial amount, start showing the story
    solo.addEventListener(`canplaythrough`, postAudioLoadRoutine);
  }

  function postAudioLoadRoutine() {
    // First remove the listener
    solo.removeEventListener(`canplaythrough`, postAudioLoadRoutine);

    // Fade in the first two lines
    setTimeout(() => {
      line1.style.color = colourDark;
    }, appearanceTimeOfLine1);
    setTimeout(() => {
      line2.style.color = colourDark;
    }, appearanceTimeOfLine2);

    // Start the solo and show graphics
    setTimeout(() => {
      playSoloAndShowGraphics();
    }, startOfSoloAndGraphics);
  }

  function playSoloAndShowGraphics() {
    // Play audio
    solo.play().then(() => {
      showGraphicsOfSolo();
    }).catch(error => {
      console.log(error);
    });
  }

  function showGraphicsOfSolo() {
    let stepCount = 0;
    fadeInGraphicsOfSolo.forEach((graphic, index) => {
      setTimeout(() => {
        graphic.style.opacity = `1`;
        stepCount++;
        if (stepCount === numberOfStepsInSolo) {
          setTimeout(() => {
            showPostSoloDivs();
          }, transitionTimeInMS);
        }
      }, (4 * index + 1.2) * 1000); // 1.2 instead of 1—to delay the graphics by a suitable fraction
    });
  }

  function showPostSoloDivs() {
    postSoloDivs.style.opacity = `1`;
  }
}
