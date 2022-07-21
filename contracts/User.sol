// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TrisNFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    
    constructor() ERC721("TrisNFT", "TRI"){}   
    Counters.Counter private _tokenId;
    address contractAddress = address(this);

    function mintToken(string memory tokenUri) public returns(uint256 itemId){
        require(contractAddress == msg.sender, "Only the marketplace contract can call this function");
        _tokenId.increment();
        uint256 currentId = _tokenId.current();
        _mint(contractAddress, currentId);
        _setTokenURI(currentId, tokenUri);
        return currentId;
    }

    function updateContractAddress( address marketPlaceAddress) public  {
        require(contractAddress == address(this) || contractAddress == msg.sender, "Address is already declared or only the  owner contract can change the address.");
        contractAddress = marketPlaceAddress;
    }

    function returnCurrentUser() public view returns(address){
        return msg.sender;
    }

    /*
        A custom function to transfer ownership from on owner to another.
    */
    function transferNft(address currOwner, address newOwner, uint tokenId) public {
        transferFrom(currOwner, newOwner, tokenId);
    }

    function getLatestTokenId() public view returns(uint256 itemId){
        return _tokenId.current();
    }

    function returnOwner(uint id) public view returns(address){
        return ownerOf(id);
    }
}

contract UserContract is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter public userCount;
    mapping(address => bool) public userIsRegistered;
    mapping(address => User) private mapToUser;
    address private trisNftAddress;
    address private owner;
    User[] private usersList;
    mapping(address => mapping(bytes32 => Post)) private _postsOfUsers;

    constructor(address nftAddress, address ownerAddress){
        trisNftAddress = nftAddress;
        owner = ownerAddress;
        TrisNFT(nftAddress).updateContractAddress(address(this));
    }

    

    /*
        User struct for storing user data. 
        name, userName, userAddress are required as in the UI the rest can be 0 or empty.
     */
    struct User{
        string name;
        string userName;
        string avatarUrl;
        string bio;
        string wallUrl;
        string email;
        uint256 followersCount;
        uint256 followingCount;
        bytes32[] postCount;
        address userAddress;
        address[] followers;
        address[] following;
    }

    /*
        Post struct for storing the posts of each user.
        The token id connects post to the nft in ./Tris_NFT.sol

        A post can be either NFT or a regular post
     */
    struct Post{
        string post;
        bytes32 postId;
        uint256 likes;
        string title;
        bool isForSale;
        bool postIsBought;
        uint256 commentsCount;
        address owner;
        address payable seller;
        string[] comments;
        uint256 priceByOwner;
        uint256 basePrice;
        bool isNft;
        uint256 tokenId;
    }

    /*
        Events 
     */
    event UserCreated (string name, string userName, string avatarUrl, address userAddress);
    event PostUploaded(string title, string post, bytes32 postId, uint256 tokenId, uint256 priceByOwner, uint256 basePrice, address owner, address seller);
    event PostSold(string post, address owner, address seller, uint256 price);

    function createUser(string memory name, string memory userName, string memory avatarUrl, string memory email, string memory bio, string memory wallUrl) public {
        require(userIsRegistered[msg.sender] != true, "User already exists");
        User storage userData = mapToUser[msg.sender];
        userData.name = name;
        userData.userName = userName;
        userData.avatarUrl = avatarUrl;
        userData.bio = bio;
        userData.wallUrl = wallUrl;
        userData.userAddress = msg.sender;
        userData.email = email;
        userCount.increment();
        userIsRegistered[msg.sender] = true;
        usersList.push(userData);
        emit UserCreated(userData.name, userData.userName, userData.avatarUrl, userData.userAddress);
    }

    /*
        Function to upload post. This requires the post parameters, 
        and uploads the post as either nft or a regular post.
    */
    function uploadPost(string memory title, string memory post, bool isNft, uint256 priceByOwner, bool isForSale) public nonReentrant{
        require(userIsRegistered[msg.sender] == true, "User not registered.");
        User storage currUser = mapToUser[msg.sender];

        uint256 tokenId;

        if(isNft){
            tokenId = TrisNFT(trisNftAddress).mintToken(post);
        }

        currUser.postCount.push(callKeccak256(post));
        Post memory currPost = Post(
            {
                post: post,
                postId: callKeccak256(post),
                likes: 0,
                title: title,
                postIsBought: false,
                isForSale: isNft ? isForSale : false,
                isNft: isNft,
                commentsCount: 0,
                priceByOwner: isNft ? priceByOwner : 0,
                comments: new string[](0),
                tokenId: isNft ? tokenId : 0,
                basePrice: isNft ? 10 : 0,
                owner: isNft ? (address(this)) : (address(0)),
                seller: isNft ? payable(msg.sender) : payable(address(0))
            }
        );

        _postsOfUsers[msg.sender][callKeccak256(post)] = currPost;
        emit PostUploaded(currPost.title, currPost.post, currPost.postId, currPost.tokenId, priceByOwner, 10, currPost.owner, currPost.seller);
    }


    /*
        Dedicated function to buy/sell nfts before selling the nft owner should make sure he has 
        made the NFT avaialbe for sale and the post is NFT. 
        Before call this function the transferNFT in TrisNFT contract should be called to transfer the ownership.
        That function can't be called form this function because that checks for msg.sender to be equal to 
        post owner but when called from here msg.sender is the address of this contract and not the owner.
        - If the post is already sold then it will be checked in the frontend throught the postIsBought parameter
          only if the postIsBought turns out to be true then the the method in the TrisNft will be called.
    */
    function buyPost(address ownerAddress, bytes32 postId, address newOwnerAddress) public payable nonReentrant{
        Post storage currPost = _postsOfUsers[ownerAddress][postId];
        require(userIsRegistered[msg.sender] == true, "User not registered");
        require(currPost.isNft == true, "Post is not an nft");
        require(msg.sender == newOwnerAddress, "Unmatched transaction, i.e., the payer should be the new owner");
        require(userIsRegistered[ownerAddress] == true, "User not registered");
        require(currPost.isForSale == true, "Post not for sale");
        uint256 price = msg.value;
        User storage newUser = mapToUser[newOwnerAddress];
        require(price >= currPost.basePrice, "Amount should be greater than base price of the post.");
        if(currPost.postIsBought == false){
            IERC721(trisNftAddress).transferFrom(address(this), newOwnerAddress, currPost.tokenId);
        }
        currPost.seller.transfer(msg.value);
        currPost.owner = (newOwnerAddress);
        currPost.seller = payable(newOwnerAddress);
        removePost(postId, ownerAddress);
        currPost.postIsBought = true;
        _postsOfUsers[newOwnerAddress][postId] = currPost;
        delete _postsOfUsers[ownerAddress][postId];
        newUser.postCount.push(postId);
    }

    function getUserList() public view returns(User[] memory){
        return usersList;
    }

    function updatePostForSale(bytes32 id, bool isForSale) public {
        require(userIsRegistered[msg.sender] == true, "User not registered");
        _postsOfUsers[msg.sender][id].isForSale = isForSale;
    }

    

    function getUserPosts() public view returns (Post[] memory userPosts){
        require(userIsRegistered[msg.sender] == true, "User not registered.");
        User storage currUser = mapToUser[msg.sender];
        uint userPostCount = currUser.postCount.length;
        Post[] memory currUserPosts = new Post[](userPostCount);
        uint currentIndex = 0;
        for(uint i = 0; i < userPostCount; i++){
           Post storage currPost = _postsOfUsers[msg.sender][currUser.postCount[currentIndex]];
           currUserPosts[currentIndex] = currPost;
           currentIndex += 1;
        }

        return currUserPosts;
    }

    function removePost(bytes32 postId, address postOwner) internal {
        bytes32[] storage postCount = mapToUser[postOwner].postCount;
        uint index;
        for(uint i = 0; i < postCount.length; i++){
            if(postCount[i] == postId){
                index = i;
                break;
            }
        }
        for(uint i = index; i < postCount.length - 1; i++){
            postCount[i] = postCount[i + 1];
        }
        postCount.pop();
    }

    function likePost(address postOwner, bytes32 postId) public {
        require(userIsRegistered[msg.sender] == true, "User not registered");
        Post storage currPost = _postsOfUsers[postOwner][postId];
        currPost.likes += 1;
    }

    function postComment( address postOwner, string memory comment, bytes32 postId ) public {
        require(userIsRegistered[msg.sender] == true, "User not registered");
        Post storage currPost = _postsOfUsers[postOwner][postId];
        currPost.commentsCount += 1;
        currPost.comments.push(comment);
    }

    function getUserData() public view returns(User memory){
        require(userIsRegistered[msg.sender] == true, "User not registered.");
        return mapToUser[msg.sender];
    } 

    function callKeccak256(string memory post) public pure returns( bytes32 result){
      return keccak256(abi.encodePacked(post));
   }  

}
