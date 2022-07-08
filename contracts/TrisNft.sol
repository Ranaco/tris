// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract TrisNFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    
    constructor() ERC721("TrisNFT", "TRI"){}
    Counters.Counter private _tokenId;
    address contractAddress;

    function mintToken(address marketplaceContract, string memory tokenUri) public returns(uint256 itemId){
        contractAddress = marketplaceContract;
        _tokenId.increment();
        uint256 currId = _tokenId.current();
        _mint(msg.sender, currId);
        _setTokenURI(currId, tokenUri);
        approve(contractAddress, currId);
        return currId;
    }

    function getLatestTokenId() public view returns(uint256 itemId){
        return _tokenId.current();
    }
}

contract TrisMarketPlace is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _soldItems;

    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    struct TrisMarketItem{
        uint256 itemId;
        uint256 tokenId;
        uint256 price;
        address payable owner;
        address payable seller;
        address nftContract;
    }
    mapping(uint256 => TrisMarketItem) private _idToMarketItem;
    event MarketItemCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        uint256 indexed price,
        address owner,
        address seller,
        address nftContract
    );

    function createMarketItem(
      address nftContractAddress,
      uint256 tokenId,
      uint256 price
    ) public payable nonReentrant{
        require(price > 0, "Price should be greater tha 0 wei");
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        
        IERC721(nftContractAddress).transferFrom(msg.sender, address(this), tokenId);

        TrisMarketItem memory marketItem = TrisMarketItem(
            itemId,
            tokenId,
            price,
            payable(address(0)),
            payable(msg.sender), 
            nftContractAddress
        );

        _idToMarketItem[itemId] = marketItem;

      emit MarketItemCreated(itemId, tokenId, price, address(this), msg.sender, nftContractAddress);
    }

    function getMarketItem(uint256 itemId) public view returns(TrisMarketItem memory item){
        return _idToMarketItem[itemId];
    }
    
    function createMarketSales(address nftContractAddress, uint256 itemId) public payable{
        uint256 price = _idToMarketItem[itemId].price;
        uint256 tokenId = _idToMarketItem[itemId].tokenId;
        require(msg.value >= price, "Price should be greater than or equal to the price of the item");
        require(_idToMarketItem[itemId].owner == msg.sender, "You are not the owner of this item");
        require(_idToMarketItem[itemId].seller == address(0), "This item is already sold");
        _idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(nftContractAddress).transferFrom(address(this), msg.sender, tokenId);
        _idToMarketItem[itemId].owner = payable(msg.sender);
        _soldItems.increment();
    }

}

























