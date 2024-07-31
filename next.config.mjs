/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        port: "",
        pathname: "/zX2GiBzzHYsroLCJsWTCdA/**",
        //hostname을 정하는 이유는
        // Image를 사용 할 때 특정 호스트를 정하지 않으면
        // 이곳 저곳에서 많은 퀄리티 조정으로 인한 비용 청구가 나올 수 있다
        // 그러니 특정 호스트에서만 링크로 인한 이미지를 받겠다는 것.
      },
    ],
  },
};

export default nextConfig;
