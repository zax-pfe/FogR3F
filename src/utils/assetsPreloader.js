export const mediaAssets = {
  images: [
    "/textures/tutorial.webp",
    "/textures/circle_05.png",
    "/textures/glow.png",
    "/textures/MIL_tronkAge.png",
    "/textures/MIL_tronkBalle.png",
    "/textures/MIL_tronkBase.png",
    "/textures/MIL_tronkClimat.png",
    "/textures/MIL_tronkFeu.png",
    "/textures/MIL_tronkInsectes.png",
    "/textures/smoke_10.png",
    "/assets/images/starting_screen/Milaghail.png",
    "/assets/images/MIL_Age.png",
    "/assets/images/MIL_Background2D.webp",
    "/assets/images/MIL_Balle.png",
    "/assets/images/MIL_boxBg.svg",
    "/assets/images/MIL_Coupe.png",
    "/assets/images/MIL_Feu.png",
    "/assets/images/MIL_Insectes.png",
    "/assets/images/MIL_PopupNoteDecoration.svg",
    "/assets/images/MIL_River.svg",
    "/assets/images/MIL_Saisons.png",
    "/assets/images/MIL_VoteStone.svg",
    "/assets/images/MIL_Wheel.svg",
    "/assets/icons/tools/MIL_Carbonne.svg",
    "/assets/icons/tools/MIL_Loupe.svg",
    "/assets/icons/tools/MIL_Mesure.svg",
    "/assets/icons/tools/MIL_Lame.svg",
    "/assets/icons/tools/MIL_Metaux.svg",
    "/assets/icons/tools/MIL_Pinceau.svg",
    "/assets/icons/MIL_Close.svg",
  ],

  videos: [
    // "/videos/loading.mp4",
    // "/videos/intro.mp4",
    "/assets/video/Cinematique.mp4",
  ],

  audios: [
    "/assets/audio/dialogue/balancoire.mp3",
    "/assets/audio/dialogue/miliBox.mp3",
    "/assets/audio/dialogue/peluche.mp3",
    "/assets/audio/dialogue/pointer.mp3",
    "/assets/audio/dialogue/tank.mp3",
    "/assets/audio/dialogue/tronk.mp3",
    "/assets/audio/ui/UI_Sound.mp3",
  ],

  files: [],
};

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve({ src, status: "loaded" });
    img.onerror = () => resolve({ src, status: "error" });

    img.src = src;
  });
}

function loadMedia(src, type) {
  return new Promise((resolve) => {
    const media = document.createElement(type);

    media.preload = "auto";
    media.src = src;

    media.oncanplaythrough = () => {
      resolve({ src, status: "loaded" });
    };

    media.onerror = () => {
      resolve({ src, status: "error" });
    };

    media.load();
  });
}

function loadFile(src) {
  return fetch(src)
    .then(() => ({ src, status: "loaded" }))
    .catch(() => ({ src, status: "error" }));
}

export async function preloadMediaAssets(onProgress) {
  const tasks = [
    ...mediaAssets.images.map((src) => () => loadImage(src)),
    ...mediaAssets.videos.map((src) => () => loadMedia(src, "video")),
    ...mediaAssets.audios.map((src) => () => loadMedia(src, "audio")),
    ...mediaAssets.files.map((src) => () => loadFile(src)),
  ];

  // console.log("Total media assets to load:", tasks.length);

  const total = tasks.length;

  if (total === 0) {
    onProgress({
      progress: 100,
      loaded: 0,
      total: 0,
      item: "",
      finished: true,
    });

    return;
  }

  let loaded = 0;

  for (const task of tasks) {
    const result = await task();
    loaded++;

    onProgress({
      progress: (loaded / total) * 100,
      loaded,
      total,
      item: result.src,
      finished: loaded === total,
    });

    // console.log(`Loaded: ${result.src} (${result.status}) - ${loaded}/${total}`);
  }
}
