// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./3_TrisNFT.sol";

contract UserContract{
    using Counters for Counters.Counter;
    Counters.Counter public userCount;
    mapping(address => bool) public userIsRegistered;
    mapping(address => User) private mapToUser;
    User[] private usersList;

    /*
     *   User struct for storing user data. 
     *   name, userName, userAddress are required as in the UI the rest can be 0 or empty.
     */
    struct User{
        string name;
        string userName;
        string avatarUrl;
        string bio;
        string wallUrl;
        uint256 followers;
        uint256 following;
        uint256 postCount;
        address payable userAddress;
        address[] friends;
        Post[] posts;
    }
   
    /*
     *   Post struct for storing the posts of each user.
     *   The token id connects post to the nft in ./Tris_NFT.sol
     *
     *   A post can be either NFT or a regular post
     */
    struct Post{
        string post;
        uint256 postId;
        uint256 likes;
        uint256 commentsCount;
        string[] comments;
        uint256 priceByOwner;
        uint256 basePrice;
        bool isNft;
        uint256 tokenId;
    }

    /*
     *   Events 
     */
    event UserCreated (string name, string userName, string avatarUrl, address userAddress);
    event PostUploaded(string post, uint256 postId, uint256 tokenId, uint256 priceByOwner, uint256 basePrice);
    
    //Function to create user
    function createUser(string memory name, string memory userName, string memory avatarUrl, string memory bio, string memory wallUrl) public {
        require(userIsRegistered[msg.sender] != true, "User already exists");
        User storage userData = mapToUser[msg.sender];
        userData.name = name;
        userData.userName = userName;
        userData.avatarUrl = avatarUrl;
        userData.bio = bio;
        userData.wallUrl = wallUrl;
        userData.followers = 0;
        userData.following = 0;
        userData.userAddress = payable(msg.sender);
        userData.friends = new address[](0);
        userCount.increment();
        userIsRegistered[msg.sender] = true;
        usersList.push(userData);
        emit UserCreated(userData.name, userData.userName, userData.avatarUrl, userData.userAddress);
    }

    //Function to upload post
    function uploadPost(string memory post, uint256 tokenId, bool isNft, uint256 priceByOwner) public {
        require(userIsRegistered[msg.sender] == true, "User not registered.");
        User storage currUser = mapToUser[msg.sender];
        currUser.postCount += 1;
        Post memory currPost = Post(
            {
                post: post,
                postId: currUser.postCount,
                likes: 0,
                isNft: isNft,
                commentsCount: 0,
                priceByOwner: isNft ? priceByOwner : 0,
                comments: new string[](0),
                tokenId: isNft ? tokenId : 0,
                basePrice: isNft ? 10 : 0
            }
        );
        currUser.posts.push(currPost);
        emit PostUploaded(currPost.post, currPost.postId, currPost.tokenId, priceByOwner, 10);
    }
    
    //Function to get all the users
    function getUserList() public view returns(User[] memory){
        return usersList;
    }
    
    //Function to get the posts of the current user, i.e., msg.sender
    function getUserPosts() public view returns (Post[] memory userPosts){
        require(userIsRegistered[msg.sender] == true, "User not registered.");
        User storage currUser = mapToUser[msg.sender];
        uint userPostCount = currUser.postCount;
        Post[] memory currUserPosts = new Post[](userPostCount);
        uint currentIndex = 0;
        for(uint i = 0; i < userPostCount; i++){
            Post storage currPost = currUser.posts[currentIndex];
            currUserPosts[currentIndex] = currPost;
            currentIndex += 1;
        }
        return currUserPosts;
    }
   
    //Function to like a post
    function likeAPost(address postOwner, uint256 postId) public returns(Post memory post){
        require(userIsRegistered[msg.sender] == true, "User not registered");
        uint256 totalPosts = mapToUser[postOwner].postCount;
        for(uint i = 0; i < totalPosts; i++){
            if(mapToUser[postOwner].posts[i].postId == postId){
                mapToUser[postOwner].posts[i].likes  += 1;
                return mapToUser[postOwner].posts[i];
            }
        }
    }

    //Function to post a comment to the post
    function postComment( address postOwner, string memory comment, uint256 postId ) public {
        require(userIsRegistered[msg.sender] == true, "User not registered");
        uint256 totalPosts = mapToUser[postOwner].postCount;
        for(uint i = 0; i < totalPosts; i++){
            if(mapToUser[postOwner].posts[i].postId == postId){
                mapToUser[postOwner].posts[i].commentsCount += 1;
                mapToUser[postOwner].posts[i].comments.push(comment);
            }
        }
    }

    //Function to get current user's data
    function getUserData() public view returns(User memory){
        require(userIsRegistered[msg.sender] == true, "User not registered.");
        return mapToUser[msg.sender];
    }
    
}
