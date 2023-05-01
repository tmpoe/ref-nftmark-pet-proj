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
        getIdFromEventParamsAsBytes(
            event.params.nftId,
            event.params.ierc721TokenAddress
        ).toHexString()
    )

    if (!nftListed) {
        nftListed = new NftListed(
            getIdFromEventParamsAsBytes(
                event.params.nftId,
                event.params.ierc721TokenAddress
            ).toHexString()
        )
    }
    nftListed.nftId = event.params.nftId
    nftListed.owner = event.params.owner.toHexString()
    nftListed.price = event.params.price
    nftListed.ierc721TokenAddress = event.params.ierc721TokenAddress.toHexString()

    nftListed.blockNumber = event.block.number
    nftListed.blockTimestamp = event.block.timestamp
    nftListed.transactionHash = event.transaction.hash.toHexString()

    nftListed.save()
}

export function handleNftListingCancelled(event: NftListingCancelledEvent): void {
    let nftListed = NftListed.load(
        getIdFromEventParamsAsBytes(
            event.params.nftId,
            event.params.ierc721TokenAddress
        ).toHexString()
    )

    let nftListingCancelled = NftListingCancelled.load(
        getIdFromEventParamsAsBytes(
            event.params.nftId,
            event.params.ierc721TokenAddress
        ).toHexString()
    )

    if (!nftListingCancelled) {
        nftListingCancelled = new NftListingCancelled(
            getIdFromEventParamsAsBytes(
                event.params.nftId,
                event.params.ierc721TokenAddress
            ).toHexString()
        )
    }

    nftListingCancelled.nftId = event.params.nftId
    nftListingCancelled.owner = event.params.owner.toHexString()
    nftListingCancelled.ierc721TokenAddress = event.params.ierc721TokenAddress.toHexString()

    nftListingCancelled.blockNumber = event.block.number
    nftListingCancelled.blockTimestamp = event.block.timestamp
    nftListingCancelled.transactionHash = event.transaction.hash.toHexString()

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
    let entity = new NftListingUpdated(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.nftId = event.params.nftId
    entity.owner = event.params.owner.toHexString()
    entity.price = event.params.price
    entity.ierc721TokenAddress = event.params.ierc721TokenAddress.toHexString()

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash.toHexString()

    entity.save()
}

export function handleNftMinted(event: NftMintedEvent): void {
    let entity = new NftMinted(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.owner = event.params.owner.toHexString()
    entity.tokenId = event.params.tokenId

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash.toHexString()

    entity.save()
}

export function handleNftRequested(event: NftRequestedEvent): void {
    let entity = new NftRequested(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.requester = event.params.requester.toHexString()

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash.toHexString()

    entity.save()
}

export function handleNftSold(event: NftSoldEvent): void {
    let entity = new NftSold(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.owner = event.params.owner.toHexString()
    entity.nftId = event.params.nftId
    entity.ierc721TokenAddress = event.params.ierc721TokenAddress.toHexString()
    entity.price = event.params.price

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash.toHexString()

    entity.save()
}

export function handleNftMarketplaceOwnershipTransferred(
    event: NftMarketplaceOwnershipTransferredEvent
): void {
    let entity = new NftMarketplaceOwnershipTransferred(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.previousOwner = event.params.previousOwner.toHexString()
    entity.newOwner = event.params.newOwner.toHexString()

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash.toHexString()

    entity.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
    return tokenId.toHexString() + nftAddress.toHexString()
}

function getIdFromEventParamsAsBytes(tokenId: BigInt, nftAddress: Address): Bytes {
    return new Bytes(<i32>parseInt(getIdFromEventParams(tokenId, nftAddress), 16))
}
