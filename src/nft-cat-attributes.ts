import {
    NftCatAttributesCreated as NftCatAttributesCreatedEvent,
    NftCatAttributesRequested as NftCatAttributesRequestedEvent,
    OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/NftCatAttributes/NftCatAttributes"
import {
    NftCatAttributesCreated,
    NftCatAttributesRequested,
    OwnershipTransferred,
} from "../generated/schema"

export function handleNftCatAttributesCreated(event: NftCatAttributesCreatedEvent): void {
    let entity = new NftCatAttributesCreated(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.requestId = event.params.requestId
    entity.requester = event.params.requester.toHexString()
    entity.breed = event.params.breed
    entity.eyecolor = event.params.eyecolor
    entity.playfulness = event.params.playfulness
    entity.cuteness = event.params.cuteness

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash.toHexString()

    entity.save()
}

export function handleNftCatAttributesRequested(event: NftCatAttributesRequestedEvent): void {
    let entity = new NftCatAttributesRequested(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.requestId = event.params.requestId
    entity.requester = event.params.requester.toHexString()

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash.toHexString()

    entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
    let entity = new OwnershipTransferred(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.previousOwner = event.params.previousOwner.toHexString()
    entity.newOwner = event.params.newOwner.toHexString()

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash.toHexString()

    entity.save()
}
