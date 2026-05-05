export const mediaAssets = {
  images: [
    "/images/smoke.png",
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
  ],

  videos: [
    // "/videos/loading.mp4",
    // "/videos/intro.mp4",
  ],

  audios: [
    "/assets/audio/dialogue/balancoire.mp3",
    "/assets/audio/dialogue/RobotvoixCropped.mp3",
    "/assets/audio/ui/click.mp3",
    "/assets/audio/ui/open.mp3",
    "/assets/audio/ui/UI_Sound.mp3",
  ],

  files: [
     
  ],
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

  console.log("Total media assets to load:", tasks.length);

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

    console.log(`Loaded: ${result.src} (${result.status}) - ${loaded}/${total}`);
  }
}