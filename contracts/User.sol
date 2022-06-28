// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract UserContract{
    using Counters for Counters.Counter;
    Counters.Counter public userCount;
    mapping(address => bool) public users;
    mapping(address => User) private mapToUser;

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

    struct Post{
        string post;
        uint256 postId;
        uint256 likes;
        uint256 commentsCount;
        string[] comments;
        uint256 tokenId;
    }

    function createUser(string memory name, string memory userName, string memory avatarUrl, string memory bio, string memory wallUrl) public {
        require(users[msg.sender] != true, "User already exists");
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
        users[msg.sender] = true;
    }

    function uploadPost(string memory post, uint256 tokenId) public {
        User storage currUser = mapToUser[msg.sender];
        currUser.postCount += 1;
        Post memory currPost = Post(
            {
                post: post,
                postId: currUser.postCount,
                likes: 0,   
                commentsCount: 0,
                comments: new string[](0),
                tokenId: tokenId
            }
        );
        currUser.posts.push(currPost);
    }

    function getUserPosts() public view returns (Post[] memory userPosts){
        require(users[msg.sender] == true, "User doesn't exist");
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
    
    function likeAPost(address postOwner, uint256 postId) public returns(Post memory post){
        uint256 totalPosts = mapToUser[postOwner].postCount;
        for(uint i = 0; i < totalPosts; i++){
            if(mapToUser[postOwner].posts[i].postId == postId){
                mapToUser[postOwner].posts[i].likes  += 1;
                return mapToUser[postOwner].posts[i];
            }
        }
    }

    function postComment( address postOwner, string memory comment, uint256 postId ) public {
        uint256 totalPosts = mapToUser[postOwner].postCount;
        for(uint i = 0; i < totalPosts; i++){
            if(mapToUser[postOwner].posts[i].postId == postId){
                mapToUser[postOwner].posts[i].commentsCount += 1;
                mapToUser[postOwner].posts[i].comments.push(comment);
            }
        }
    }

    function getUserData() public view returns(User memory){
        require(users[msg.sender] == true, "User doesn't exist");
        return mapToUser[msg.sender];
    }
    
}
