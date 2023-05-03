import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  NftCatAttributesCreated,
  NftCatAttributesRequested,
  OwnershipTransferred
} from "../generated/NftCatAttributes/NftCatAttributes"

export function createNftCatAttributesCreatedEvent(
  requestId: BigInt,
  requester: Address,
  breed: i32,
  eyecolor: i32,
  playfulness: BigInt,
  cuteness: BigInt
): NftCatAttributesCreated {
  let nftCatAttributesCreatedEvent = changetype<NftCatAttributesCreated>(
    newMockEvent()
  )

  nftCatAttributesCreatedEvent.parameters = new Array()

  nftCatAttributesCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  nftCatAttributesCreatedEvent.parameters.push(
    new ethereum.EventParam("requester", ethereum.Value.fromAddress(requester))
  )
  nftCatAttributesCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "breed",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(breed))
    )
  )
  nftCatAttributesCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eyecolor",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(eyecolor))
    )
  )
  nftCatAttributesCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "playfulness",
      ethereum.Value.fromUnsignedBigInt(playfulness)
    )
  )
  nftCatAttributesCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "cuteness",
      ethereum.Value.fromUnsignedBigInt(cuteness)
    )
  )

  return nftCatAttributesCreatedEvent
}

export function createNftCatAttributesRequestedEvent(
  requestId: BigInt,
  requester: Address
): NftCatAttributesRequested {
  let nftCatAttributesRequestedEvent = changetype<NftCatAttributesRequested>(
    newMockEvent()
  )

  nftCatAttributesRequestedEvent.parameters = new Array()

  nftCatAttributesRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  nftCatAttributesRequestedEvent.parameters.push(
    new ethereum.EventParam("requester", ethereum.Value.fromAddress(requester))
  )

  return nftCatAttributesRequestedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
