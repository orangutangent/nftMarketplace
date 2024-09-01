// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    uint private _tokenIds = 0;
    uint private _itemsSold = 0;

    address payable private contractOwner;
    uint256 private listPrice = 0.01 ether;

    struct ListedToken {
        uint256 tokenId;
        address payable owner;  // Владелец токена (продавец на момент листинга)
        address payable creator; // Создатель токена
        uint256 price;
        bool currentlyListed;
        uint256 royalty; // Процент роялти для создателя
    }

    mapping(uint256 => ListedToken) private idToListedToken;

    event TokenListedSuccess(
        uint256 indexed tokenId,
        address owner,
        address creator,
        uint256 price,
        bool currentlyListed
    );

    constructor() ERC721("NFTMarketplace", "NFTM") {
        contractOwner = payable(msg.sender);
    }

    function createToken(string memory tokenURI, uint256 price, uint256 royalty) public returns (uint) {
        require(royalty <= 20, "Royalty cannot exceed 20%"); 

        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        // Листинг токена в дальнейшем может быть выполнен через отдельную функцию
        idToListedToken[newTokenId] = ListedToken(
            newTokenId,
            payable(msg.sender),
            payable(msg.sender), // Создатель и владелец на момент создания
            price,
            false, // Токен не выставлен на продажу при создании
            royalty
        );

        return newTokenId;
    }

    function listTokenForSale(uint256 tokenId, uint256 price) public payable {
        require(ownerOf(tokenId) == msg.sender, "You must own the token to list it for sale");
        require(price > 0, "Price must be greater than zero");
        require(msg.value == listPrice, "Price must be equal to listing price");

        ListedToken storage token = idToListedToken[tokenId];
        require(token.currentlyListed == false, "Token is already listed for sale");

        token.price = price;
        token.owner = payable(msg.sender);  // Устанавливаем текущего владельца как продавца
        token.currentlyListed = true;

        _transfer(msg.sender, address(this), tokenId);

        emit TokenListedSuccess(
            tokenId,
            msg.sender,
            token.creator,
            price,
            true
        );
    }

    function executeSale(uint256 tokenId) public payable {
        ListedToken storage token = idToListedToken[tokenId];
        uint256 price = token.price;
        address payable seller = token.owner;
        address payable creator = token.creator;
        uint256 royalty = token.royalty;
        
        require(token.currentlyListed, "Token is not currently listed for sale");
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        uint256 royaltyFee = (price * royalty) / 100;
        uint256 sellerAmount = price - royaltyFee;

        token.currentlyListed = false;
        token.owner = payable(msg.sender); // Новый владелец

        _itemsSold++;

        _transfer(address(this), msg.sender, tokenId);
        approve(address(this), tokenId);

        // Переводим средства
        payable(contractOwner).transfer(listPrice); // Листинговая плата
        creator.transfer(royaltyFee); // Роялти создателя
        seller.transfer(sellerAmount); // Остаток суммы продавцу
    }

    function updateListPrice(uint256 _listPrice) public payable {
        require(contractOwner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds;
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;

        for (uint i = 0; i < nftCount; i++) {
            uint currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }

        return tokens;
    }

    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds;
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToListedToken[i + 1].owner == msg.sender || idToListedToken[i + 1].creator == msg.sender) {
                itemCount += 1;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToListedToken[i + 1].owner == msg.sender || idToListedToken[i + 1].creator == msg.sender) {
                uint currentId = i + 1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds;
    }
}
