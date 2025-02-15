import type { NextConfig } from "next";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.di-nautika.hr",
      "scubapro.johnsonoutdoors.com",
      "www.shutthefrontdoor.co.nz",
      "www.scubadiving.com",
      "www.ndiver.com",
      "www.cressithai.com",
      "divensurf.com",
      "www.mantusmarine.com",
      "m.media-amazon.com",
      "raceskin.co.uk",
    ],
  },
};

export default nextConfig;
