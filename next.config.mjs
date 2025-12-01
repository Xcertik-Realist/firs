import { withContentlayer } from "@contentlayer/next";

export default withContentlayer({
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "images.pexels.com"],
  },
});
