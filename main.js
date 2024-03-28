import { loadVideo } from "./loader.js";
import { loadAudio } from "./loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  let experienceStarted = false;

  const start = async () => {
    if (experienceStarted) {
      return;
    }

    experienceStarted = true;
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.glitch.global/8045e1db-f664-44a0-84e2-4c60083a24d0/warholtarget.mind?v=1706541249512",
      uiScanning: "#scanning",
      uiLoading: "no",
    });

    const { renderer, scene, camera } = mindarThree;
    camera.near = 0.01;
    camera.far = 5000;

    //const audioClipPromisePrimero = loadAudio(
      "https://cdn.glitch.global/ab9aea4b-3174-43cc-8f71-4e9ed0475f6b/1.Documentary%20Piano%20Loop_1.mp3?v=1706202845698"
   // );

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioPrimero = new THREE.Audio(listener);

  //  audioClipPromisePrimero.then((audioClip) => {
  //)    audioPrimero.setBuffer(audioClip);
  //    audioPrimero.setVolume(1.0);
   //   audioPrimero.setLoop(true);
 //   });

    const startButton = document.getElementById("startButton");
    const infoText = document.getElementById("infoText");

    startButton.style.display = "none";
    infoText.style.display = "none";

    const nuevoBoton = document.createElement("button");
    nuevoBoton.textContent = "Conoce más";
    nuevoBoton.id = "nuevoBoton";
    nuevoBoton.style.backgroundColor = "#414143";
    nuevoBoton.style.color = "#FFFFFF";
    nuevoBoton.style.fontFamily = "Segoe, sans-serif";
    nuevoBoton.style.display = "none"; // El nuevo botón está oculto al principio
    nuevoBoton.style.position = "absolute";
    nuevoBoton.style.top = "20px"; // Cambia el valor según tu preferencia
    nuevoBoton.style.left = "50%"; // Cambia el valor según tu preferencia
    nuevoBoton.style.transform = "translateX(-50%)";
    nuevoBoton.style.width = "200px"; // Cambia el valor del ancho según tu preferencia
    nuevoBoton.style.height = "50px";
    nuevoBoton.style.fontSize = "18px";
    nuevoBoton.style.border = "none";

    
    nuevoBoton.addEventListener("click", () => {
      // Acciones a realizar cuando se hace clic en el nuevo botón
      window.location.href = "https://revistamundodiners.com/"; // Cambia la URL a la que deseas redirigir
    });

    document.body.appendChild(nuevoBoton);


    // VIDEO DE LA PORTADA MAYO
    const Portada1 = {
      url: "https://cdn.glitch.global/8045e1db-f664-44a0-84e2-4c60083a24d0/warhol_FINAL_MAIN.mp4?v=1706655389788",
      position: new THREE.Vector3(0, 0, 0),
      scale: new THREE.Vector3((764 / 1002) * 1.33, 1.335, 1), // Ajusta la escala según las dimensiones originales
      rotation: new THREE.Euler(0, 0, 0),
    };

    const Portada1Texture = await loadVideo(Portada1.url);
    Portada1Texture.encoding = THREE.sRGBEncoding; // Ajusta según tus necesidades


    const Portada1Video = Portada1Texture.image;

    // Agrega un evento al video para detectar cuando termina de reproducirse
    Portada1Video.addEventListener("ended", () => {
      nuevoBoton.style.display = "block"; // Muestra el nuevo botón al finalizar el video
    });

    const Portada1Geometry = new THREE.PlaneGeometry(1, 1);

    const Portada1Material = new THREE.MeshBasicMaterial({
      map: Portada1Texture,
    });

    const Portada1Plane = new THREE.Mesh(Portada1Geometry, Portada1Material);

    Portada1Plane.rotation.x = Portada1.rotation.x;
    Portada1Plane.position.copy(Portada1.position);
    Portada1Plane.scale.copy(Portada1.scale);

    const Portada1Anchor = mindarThree.addAnchor(0);

    Portada1Anchor.group.add(Portada1Plane);

    Portada1Anchor.onTargetFound = () => {
      Portada1Video.play();
      audioPrimero.play();
    };

    Portada1Anchor.onTargetLost = () => {
      Portada1Video.pause();
      audioPrimero.pause();
    };

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  const startButton = document.createElement("button");
  startButton.textContent = "COMENZAR";
  startButton.id = "startButton";
  startButton.style.backgroundColor = "#414143";
  startButton.style.color = "#FFFFFF";
  startButton.style.fontFamily = "Segoe, sans-serif";

  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);

  const infoText = document.createElement("p");
  infoText.id = "infoText";
  infoText.style.fontFamily = "Segoe, sans-serif";

  document.body.appendChild(infoText);
});
