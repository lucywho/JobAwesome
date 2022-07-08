/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = nextConfig

// module.exports = {
//     reactStrictMode: true,
//     async redirects() {
//         return [
//             {
//                 source: "/home",
//                 destination: "/",
//                 permanent: true,
//             },
//         ]
//     },
// }
