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
    NftListingCancelled,
    NftListingUpdated,
    NftMinted,
    NftRequested,
    NftSold,
    NftMarketplaceOwnershipTransferred,
} from "../generated/schema"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { store } from "@graphprotocol/graph-ts"

export function handleNftListed(event: NftListedEvent): void {
    let nftListed = NftListed.load(
        getIdFromEventParamsAsBytes(event.params.nftId, event.params.ierc721TokenAddress)
    )

    if (!nftListed) {
        nftListed = new NftListed(
            getIdFromEventParamsAsBytes(event.params.nftId, event.params.ierc721TokenAddress)
        )
    }
    nftListed.nftId = event.params.nftId
    nftListed.owner = event.params.owner
    nftListed.price = event.params.price
    nftListed.ierc721TokenAddress = event.params.ierc721TokenAddress

    nftListed.blockNumber = event.block.number
    nftListed.blockTimestamp = event.block.timestamp
    nftListed.transactionHash = event.transaction.hash

    nftListed.save()
}

export function handleNftListingCancelled(event: NftListingCancelledEvent): void {
    let nftListed = NftListed.load(
        getIdFromEventParamsAsBytes(event.params.nftId, event.params.ierc721TokenAddress)
    )

    let nftListingCancelled = NftListingCancelled.load(
        getIdFromEventParamsAsBytes(event.params.nftId, event.params.ierc721TokenAddress)
    )

    if (!nftListingCancelled) {
        nftListingCancelled = new NftListingCancelled(
            getIdFromEventParamsAsBytes(event.params.nftId, event.params.ierc721TokenAddress)
        )
    }

    nftListingCancelled.nftId = event.params.nftId
    nftListingCancelled.owner = event.params.owner
    nftListingCancelled.ierc721TokenAddress = event.params.ierc721TokenAddress

    nftListingCancelled.blockNumber = event.block.number
    nftListingCancelled.blockTimestamp = event.block.timestamp
    nftListingCancelled.transactionHash = event.transaction.hash

    if (!nftListed) {
        return
    }

    // Is this okay? I want to remove any cancelled stuff so I cannot query it anymore
    store.remove(
        "NftListed",
        getIdFromEventParams(event.params.nftId, event.params.ierc721TokenAddress)
    )
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
    entity.owner = event.params.owner
    entity.tokenId = event.params.tokenId

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
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
    entity.owner = event.params.owner
    entity.nftId = event.params.nftId
    entity.ierc721TokenAddress = event.params.ierc721TokenAddress
    entity.price = event.params.price

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
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

function getIdFromEventParamsAsBytes(tokenId: BigInt, nftAddress: Address): Bytes {
    return new Bytes(parseInt(tokenId.toHexString() + nftAddress.toHexString(), 16))
}
