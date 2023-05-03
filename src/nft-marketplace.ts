import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
    NftListed as NftListedEvent,
    NftListingCancelled as NftListingCancelledEvent,
    NftListingUpdated as NftListingUpdatedEvent,
    NftMinted as NftMintedEvent,
    NftRequested as NftRequestedEvent,
    NftSold as NftSoldEvent,
    NftMarketplaceOwnershipTransferred as NftMarketplaceOwnershipTransferredEvent,
} from "../generated/NftMarketplace/NftMarketplace"
import {
    NftListed,
    ActiveListing,
    NftListingCancelled,
    NftListingUpdated,
    NftMinted,
    NftRequested,
    NftSold,
    NftMarketplaceOwnershipTransferred,
    OwnedNft,
} from "../generated/schema"

export function handleNftListed(event: NftListedEvent): void {
    let nftListed = new NftListed(event.transaction.hash.concatI32(event.logIndex.toI32()))
    let activeListing = ActiveListing.load(
        getIdFromEventParams(event.params.nftId, event.params.ierc721TokenAddress)
    )

    if (!activeListing) {
        activeListing = new ActiveListing(
            getIdFromEventParams(event.params.nftId, event.params.ierc721TokenAddress)
        )
    }

    nftListed.nftId = event.params.nftId
    nftListed.owner = event.params.owner
    nftListed.price = event.params.price
    nftListed.ierc721TokenAddress = event.params.ierc721TokenAddress

    nftListed.blockNumber = event.block.number
    nftListed.blockTimestamp = event.block.timestamp
    nftListed.transactionHash = event.transaction.hash

    activeListing.nftId = event.params.nftId
    activeListing.owner = event.params.owner
    activeListing.price = event.params.price
    activeListing.ierc721TokenAddress = event.params.ierc721TokenAddress

    activeListing.transactionHash = event.transaction.hash
    activeListing.buyer = Address.fromString("0x0000000000000000000000000000000000000000")

    nftListed.save()
    activeListing.save()
}

export function handleNftListingCancelled(event: NftListingCancelledEvent): void {
    let entity = new NftListingCancelled(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.nftId = event.params.nftId
    entity.owner = event.params.owner
    entity.ierc721TokenAddress = event.params.ierc721TokenAddress

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    let activeListing = ActiveListing.load(
        getIdFromEventParams(event.params.nftId, event.params.ierc721TokenAddress)
    )
    activeListing!.buyer = event.params.owner
    entity.save()
    activeListing!.save()
}

export function handleNftListingUpdated(event: NftListingUpdatedEvent): void {
    let entity = new NftListingUpdated(event.transaction.hash.concatI32(event.logIndex.toI32()))

    entity.nftId = event.params.nftId
    entity.owner = event.params.owner
    entity.price = event.params.price
    entity.ierc721TokenAddress = event.params.ierc721TokenAddress

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleNftMinted(event: NftMintedEvent): void {
    let entity = new NftMinted(event.transaction.hash.concatI32(event.logIndex.toI32()))
    let ownedNft = new OwnedNft(
        getIdFromEventParams(event.params.tokenId, event.params.ierc721TokenAddress)
    )
    entity.owner = event.params.owner
    entity.tokenId = event.params.tokenId

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    ownedNft.nftId = event.params.tokenId
    ownedNft.owner = event.params.owner
    ownedNft.ierc721TokenAddress = event.params.ierc721TokenAddress
    ownedNft.transactionHash = event.transaction.hash

    entity.save()
    ownedNft.save()
}

export function handleNftRequested(event: NftRequestedEvent): void {
    let entity = new NftRequested(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.requester = event.params.requester

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleNftSold(event: NftSoldEvent): void {
    let entity = new NftSold(event.transaction.hash.concatI32(event.logIndex.toI32()))
    let activeListing = ActiveListing.load(
        getIdFromEventParams(event.params.nftId, event.params.ierc721TokenAddress)
    )
    let ownedNft = OwnedNft.load(
        getIdFromEventParams(event.params.nftId, event.params.ierc721TokenAddress)
    )
    entity.owner = event.params.owner
    entity.nftId = event.params.nftId
    entity.ierc721TokenAddress = event.params.ierc721TokenAddress
    entity.price = event.params.price

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    activeListing!.buyer = event.params.owner
    ownedNft!.owner = event.params.owner

    entity.save()
    activeListing!.save()
    ownedNft!.save()
}

export function handleNftMarketplaceOwnershipTransferred(
    event: NftMarketplaceOwnershipTransferredEvent
): void {
    let entity = new NftMarketplaceOwnershipTransferred(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.previousOwner = event.params.previousOwner
    entity.newOwner = event.params.newOwner

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
    return tokenId.toHexString() + nftAddress.toHexString()
}
