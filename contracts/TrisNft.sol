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
    address contractAddress = address(0);

    function mintToken(string memory tokenUri) public returns(uint256 itemId){
        require(contractAddress == msg.sender, "Only the marketplace contract can call this function");
        _tokenId.increment();
        uint256 currentId = _tokenId.current();
        _mint(contractAddress, currentId);
        _setTokenURI(currentId, tokenUri);
        return currentId;
    }

    function updateContractAddress( address marketPlaceAddress) public  {
        require(contractAddress == address(0) || contractAddress == msg.sender, "Address is already declared or only the  owner contract can change the address.");
        contractAddress = marketPlaceAddress;
    }

    function getLatestTokenId() public view returns(uint256 itemId){
        return _tokenId.current();
    }
}

contract TrisMarketPlace is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _soldItems;
    address private trisNftAddress;

    constructor(address nftAddress, address payable ownerAddress){
        trisNftAddress = nftAddress;
        TrisNFT(trisNftAddress).updateContractAddress(address(this));
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
      uint256 price,
      address payable ownerAddress
    ) public payable nonReentrant{
        require(price > 0, "Price should be greater tha 0 wei");
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        

        uint256 tokenId = TrisNFT(trisNftAddress).mintToken("https://");
        TrisMarketItem memory marketItem = TrisMarketItem(
            itemId,
            tokenId,
            price,
            payable(address(0)),
            ownerAddress,
            trisNftAddress
        );

        _idToMarketItem[itemId] = marketItem;

      emit MarketItemCreated(itemId, tokenId, price, address(this), ownerAddress, trisNftAddress);
    }

    function getMarketItem(uint256 itemId) public view returns(TrisMarketItem memory item){
        return _idToMarketItem[itemId];
    }
    
    function createMarketSales(address nftContractAddress, uint256 itemId, address payable newOwnerAddress ) public payable{
        uint256 price = _idToMarketItem[itemId].price;
        uint256 tokenId = _idToMarketItem[itemId].tokenId;
        require(msg.value >= price, "Price should be greater than or equal to the price of the item");
        require(_idToMarketItem[itemId].owner == address(0), "This item is already sold");
        _idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(nftContractAddress).transferFrom(address(this), newOwnerAddress, tokenId);
        _idToMarketItem[itemId].owner = payable(newOwnerAddress);
        _soldItems.increment();
    }

}
