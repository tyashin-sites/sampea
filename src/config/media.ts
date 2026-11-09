/**
 * Renders of the Sampéa bottle, supplied by the customer and served from the
 * Tyashin media library. They are renders of the Perfume.glb model, not
 * photographs of a finished bottle (see docs/ASSET-DEBT.md).
 *
 * One place for the URLs: re-upload an asset and only this file changes.
 */
const MEDIA_BASE =
  'https://website-api.tyashin.com/api/v1/public/media/media/6af1ee7a2976dd881e839d60';

/** Three-quarter front, 1800x1350. */
export const BOTTLE_HERO = `${MEDIA_BASE}/2eff8c4097c26ed9f75564dcdf5d14f4728467616fef9961fd8c1b50ad8d4d1b.jpg`;

/** Straight front, 1440x1800 — the face a name would sit on. */
export const BOTTLE_FRONT = `${MEDIA_BASE}/30db674e89a6d0a2dad9479b174d410a174bfe45b171a4fc55cc4f412cd96de0.jpg`;

/** Close detail of the cap, 1800x1800. */
export const BOTTLE_DETAIL = `${MEDIA_BASE}/0b836d3c17d2e0365f1635e0a3b5e433ed586b1fcc9d90766c6b8a081ed8dd0a.jpg`;

/** Side profile, 1800x1013. */
export const BOTTLE_PROFILE = `${MEDIA_BASE}/8d47c1529ad74588c97c29400cc2526a4bad1d9f5b6a5fab5e4e620c45dcfb50.jpg`;
