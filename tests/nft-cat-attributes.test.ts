import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { NftCatAttributesCreated } from "../generated/schema"
import { NftCatAttributesCreated as NftCatAttributesCreatedEvent } from "../generated/NftCatAttributes/NftCatAttributes"
import { handleNftCatAttributesCreated } from "../src/nft-cat-attributes"
import { createNftCatAttributesCreatedEvent } from "./nft-cat-attributes-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let requestId = BigInt.fromI32(234)
    let requester = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let breed = 123
    let eyecolor = 123
    let playfulness = BigInt.fromI32(234)
    let cuteness = BigInt.fromI32(234)
    let newNftCatAttributesCreatedEvent = createNftCatAttributesCreatedEvent(
      requestId,
      requester,
      breed,
      eyecolor,
      playfulness,
      cuteness
    )
    handleNftCatAttributesCreated(newNftCatAttributesCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NftCatAttributesCreated created and stored", () => {
    assert.entityCount("NftCatAttributesCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NftCatAttributesCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "requestId",
      "234"
    )
    assert.fieldEquals(
      "NftCatAttributesCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "requester",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NftCatAttributesCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "breed",
      "123"
    )
    assert.fieldEquals(
      "NftCatAttributesCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "eyecolor",
      "123"
    )
    assert.fieldEquals(
      "NftCatAttributesCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "playfulness",
      "234"
    )
    assert.fieldEquals(
      "NftCatAttributesCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cuteness",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
