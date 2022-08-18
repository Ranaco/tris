# Tris
>### The web3 social media with a twist

`by Rana`

# Screenshot

![Screenshot 2022-08-08 005915](https://user-images.githubusercontent.com/86058409/183308843-1fd6a56c-d905-440c-aa82-a7893ea53d64.png)
![create](https://user-images.githubusercontent.com/86058409/183309299-d05b273c-c856-4526-9124-7dc82975f644.png)


## Introuction

Whenever we hear of a social media app, what comes in mind is a heavy app where you can upload and share phtos and  that's it. But Tris is way different than any social media you would have ever heard of.
Almost every day we come to know about some data leak from tech giants which results to loss of privacy and much more. And over that what can you hope from a social media?(except of uploading posts and connecting to communnity) Well, this is where Tris comes in. You are super secure with Tris, because all your data is stored in blockchain, and over that you can earn from your posts!

## Platform Overview

Tris is a decentralised social media app similar to Facebook or Twitter but totally decentralised. Every single user data from the user profile picture to his followers are stored in a smart contract that is deployed on the Polygon blockchain via Alchemy. 

- Super secure and user friendly login with Sequence or Metamask.
- Upload posts as NFT and then sell or buy them. 
- Can uploadd your own profile picture, or even a wall image for your profile!
- Clean and minimalistic UI with dark theme.
- Upload post as an NFT, and then can sell your post or buy someone else's post as NFT.
- Posts can be liked or commented. 
- The base price for each post is calculated by the total number of likes and comments for that post. 
- User can assign a custom price to negotiate for his/her post.
- A profile page where you can see all of your post and your profile. 
- Can tag your NFT as is is for sale so that you can decide if someone can buy it or not.
- Users can follow each others.

## Impact 

Tris can be a great idea for next generation of social media as it not only  provides a complete solution for user privacy but also is an NFT marketplace where users can buy or sell posts and earn. 


## Tech Stack Used

- Polygon (Contract deployment )
- Sequence ( Web3 wallet service )
- Alchemy ( Contract management service )
- Spheron ( Service provider for hosting )
- Filecoin ( Hosting server )
- Next js
- Chakra-ui
- Web3
- Typescript
- NFT.Storage ( IPFS storage )
- Framer motion
- Truffle
- Chai js

## Contract deployment links
- [Tris NFT Contract](https://mumbai.polygonscan.com/address/0x46C98595a9D8C83dfE6dfF11A0F6b47bEb7Fe7aD)
- [Tris User/Marketplace Contract](https://mumbai.polygonscan.com/address/0x9FD8476bC9D4D7A7eb3F8E99162B0f49424672b5)

## Future work

- Use Meta transaction(gasless transaction) to reduce user costs and provide them a better user experience.
- Add support for videos, gif, and other assets (currently only image is supported).
- Add reporting on posts and comments.
- Add advertisement option.
- Update the marketplace. 

## Structure

 ```
    📦 Tris
     ┣ 📂 .github
     ┣ 📂 node_modules
     ┣ 📂 components (Custom components directory)
     ┣ 📂 contract (Solidity Smart Contracts)
     ┣ 📂 migrations (Truffle deployment migrations)
     ┣ 📂 test (Smart Contract Tests)
     ┣ 📂 pages (Pages and _app configuration)
     ┣ 📂 lib (For IPFS, data parising and login methods)
     ┣ 📜 package.json (project dependencies)
     ┣ 📜 README.md (Project Documentation)
     ┣ 📜 public (Public assets directory)
     ┗ 📜 truffle-config.js (Truffle Project Config)
 ```
