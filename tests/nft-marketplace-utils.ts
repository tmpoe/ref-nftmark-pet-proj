import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  NftListed,
  NftListingCancelled,
  NftListingUpdated,
  NftMinted,
  NftRequested,
  NftSold,
  NftMarketplaceOwnershipTransferred
} from "../generated/NftMarketplace/NftMarketplace"

export function createNftListedEvent(
  nftId: BigInt,
  owner: Address,
  price: BigInt,
  ierc721TokenAddress: Address
): NftListed {
  let nftListedEvent = changetype<NftListed>(newMockEvent())

  nftListedEvent.parameters = new Array()

  nftListedEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "ierc721TokenAddress",
      ethereum.Value.fromAddress(ierc721TokenAddress)
    )
  )

  return nftListedEvent
}

export function createNftListingCancelledEvent(
  nftId: BigInt,
  owner: Address,
  ierc721TokenAddress: Address
): NftListingCancelled {
  let nftListingCancelledEvent = changetype<NftListingCancelled>(newMockEvent())

  nftListingCancelledEvent.parameters = new Array()

  nftListingCancelledEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  )
  nftListingCancelledEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  nftListingCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "ierc721TokenAddress",
      ethereum.Value.fromAddress(ierc721TokenAddress)
    )
  )

  return nftListingCancelledEvent
}

export function createNftListingUpdatedEvent(
  nftId: BigInt,
  owner: Address,
  price: BigInt,
  ierc721TokenAddress: Address
): NftListingUpdated {
  let nftListingUpdatedEvent = changetype<NftListingUpdated>(newMockEvent())

  nftListingUpdatedEvent.parameters = new Array()

  nftListingUpdatedEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  )
  nftListingUpdatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  nftListingUpdatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  nftListingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "ierc721TokenAddress",
      ethereum.Value.fromAddress(ierc721TokenAddress)
    )
  )

  return nftListingUpdatedEvent
}

export function createNftMintedEvent(
  owner: Address,
  tokenId: BigInt
): NftMinted {
  let nftMintedEvent = changetype<NftMinted>(newMockEvent())

  nftMintedEvent.parameters = new Array()

  nftMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  nftMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return nftMintedEvent
}

export function createNftRequestedEvent(requester: Address): NftRequested {
  let nftRequestedEvent = changetype<NftRequested>(newMockEvent())

  nftRequestedEvent.parameters = new Array()

  nftRequestedEvent.parameters.push(
    new ethereum.EventParam("requester", ethereum.Value.fromAddress(requester))
  )

  return nftRequestedEvent
}

export function createNftSoldEvent(
  owner: Address,
  nftId: BigInt,
  ierc721TokenAddress: Address,
  price: BigInt
): NftSold {
  let nftSoldEvent = changetype<NftSold>(newMockEvent())

  nftSoldEvent.parameters = new Array()

  nftSoldEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "ierc721TokenAddress",
      ethereum.Value.fromAddress(ierc721TokenAddress)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftSoldEvent
}

export function createNftMarketplaceOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): NftMarketplaceOwnershipTransferred {
  let nftMarketplaceOwnershipTransferredEvent = changetype<
    NftMarketplaceOwnershipTransferred
  >(newMockEvent())

  nftMarketplaceOwnershipTransferredEvent.parameters = new Array()

  nftMarketplaceOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  nftMarketplaceOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return nftMarketplaceOwnershipTransferredEvent
}
