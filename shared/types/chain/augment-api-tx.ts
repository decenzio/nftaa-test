// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type { ApiTypes, AugmentedSubmittable, SubmittableExtrinsic, SubmittableExtrinsicFunction } from '@polkadot/api-base/types';
import type { Bytes, Compact, Option, Vec, bool, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress } from '@polkadot/types/interfaces/runtime';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> = SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> = SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * Burn the specified liquid free balance from the origin account.
       * 
       * If the origin's account ends up below the existential deposit as a result
       * of the burn and `keep_alive` is false, the account will be reaped.
       * 
       * Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
       * this `burn` operation will reduce total issuance by the amount _burned_.
       **/
      burn: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, bool]>;
      /**
       * Adjust the total issuance in a saturating way.
       * 
       * Can only be called by root and always needs a positive `delta`.
       * 
       * # Example
       **/
      forceAdjustTotalIssuance: AugmentedSubmittable<(direction: PalletBalancesAdjustmentDirection | 'Increase' | 'Decrease' | number | Uint8Array, delta: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [PalletBalancesAdjustmentDirection, Compact<u128>]>;
      /**
       * Set the regular balance of a given account.
       * 
       * The dispatch origin for this call is `root`.
       **/
      forceSetBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Exactly as `transfer_allow_death`, except the origin must be root and the source account
       * may be specified.
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * Unreserve some balance from a user by force.
       * 
       * Can only be called by ROOT.
       **/
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u128]>;
      /**
       * Transfer the entire transferable balance from the caller account.
       * 
       * NOTE: This function only attempts to transfer _transferable_ balances. This means that
       * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
       * transferred by this function. To ensure that this function results in a killed account,
       * you might need to prepare the account by removing any reference counters, storage
       * deposits, etc...
       * 
       * The dispatch origin of this call must be Signed.
       * 
       * - `dest`: The recipient of the transfer.
       * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
       * of the funds the account has, causing the sender account to be killed (false), or
       * transfer everything except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true).
       **/
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       **/
      transferAllowDeath: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
       * kill the origin account.
       * 
       * 99% of the time you want [`transfer_allow_death`] instead.
       * 
       * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Upgrade a specified account.
       * 
       * - `origin`: Must be `Signed`.
       * - `who`: The account to be upgraded.
       * 
       * This will waive the transaction fee if at least all but 10% of the accounts needed to
       * be upgraded. (We let some not have to be upgraded just in order to allow for the
       * possibility of churn).
       **/
      upgradeAccounts: AugmentedSubmittable<(who: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    collatorSelection: {
      /**
       * Add a new account `who` to the list of `Invulnerables` collators. `who` must have
       * registered session keys. If `who` is a candidate, they will be removed.
       * 
       * The origin for this call must be the `UpdateOrigin`.
       **/
      addInvulnerable: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Deregister `origin` as a collator candidate. Note that the collator can only leave on
       * session change. The `CandidacyBond` will be unreserved immediately.
       * 
       * This call will fail if the total number of candidates would drop below
       * `MinEligibleCollators`.
       **/
      leaveIntent: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Register this account as a collator candidate. The account must (a) already have
       * registered session keys and (b) be able to reserve the `CandidacyBond`.
       * 
       * This call is not available to `Invulnerable` collators.
       **/
      registerAsCandidate: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Remove an account `who` from the list of `Invulnerables` collators. `Invulnerables` must
       * be sorted.
       * 
       * The origin for this call must be the `UpdateOrigin`.
       **/
      removeInvulnerable: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Set the candidacy bond amount.
       * 
       * If the candidacy bond is increased by this call, all current candidates which have a
       * deposit lower than the new bond will be kicked from the list and get their deposits
       * back.
       * 
       * The origin for this call must be the `UpdateOrigin`.
       **/
      setCandidacyBond: AugmentedSubmittable<(bond: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * Set the ideal number of non-invulnerable collators. If lowering this number, then the
       * number of running collators could be higher than this figure. Aside from that edge case,
       * there should be no other way to have more candidates than the desired number.
       * 
       * The origin for this call must be the `UpdateOrigin`.
       **/
      setDesiredCandidates: AugmentedSubmittable<(max: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Set the list of invulnerable (fixed) collators. These collators must do some
       * preparation, namely to have registered session keys.
       * 
       * The call will remove any accounts that have not registered keys from the set. That is,
       * it is non-atomic; the caller accepts all `AccountId`s passed in `new` _individually_ as
       * acceptable Invulnerables, and is not proposing a _set_ of new Invulnerables.
       * 
       * This call does not maintain mutual exclusivity of `Invulnerables` and `Candidates`. It
       * is recommended to use a batch of `add_invulnerable` and `remove_invulnerable` instead. A
       * `batch_all` can also be used to enforce atomicity. If any candidates are included in
       * `new`, they should be removed with `remove_invulnerable_candidate` after execution.
       * 
       * Must be called by the `UpdateOrigin`.
       **/
      setInvulnerables: AugmentedSubmittable<(updated: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * The caller `origin` replaces a candidate `target` in the collator candidate list by
       * reserving `deposit`. The amount `deposit` reserved by the caller must be greater than
       * the existing bond of the target it is trying to replace.
       * 
       * This call will fail if the caller is already a collator candidate or invulnerable, the
       * caller does not have registered session keys, the target is not a collator candidate,
       * and/or the `deposit` amount cannot be reserved.
       **/
      takeCandidateSlot: AugmentedSubmittable<(deposit: u128 | AnyNumber | Uint8Array, target: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128, AccountId32]>;
      /**
       * Update the candidacy bond of collator candidate `origin` to a new amount `new_deposit`.
       * 
       * Setting a `new_deposit` that is lower than the current deposit while `origin` is
       * occupying a top-`DesiredCandidates` slot is not allowed.
       * 
       * This call will fail if `origin` is not a collator candidate, the updated bond is lower
       * than the minimum candidacy bond, and/or the amount cannot be reserved.
       **/
      updateBond: AugmentedSubmittable<(newDeposit: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    cumulusXcm: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    messageQueue: {
      /**
       * Execute an overweight message.
       * 
       * Temporary processing errors will be propagated whereas permanent errors are treated
       * as success condition.
       * 
       * - `origin`: Must be `Signed`.
       * - `message_origin`: The origin from which the message to be executed arrived.
       * - `page`: The page in the queue in which the message to be executed is sitting.
       * - `index`: The index into the queue of the message to be executed.
       * - `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
       * of the message.
       * 
       * Benchmark complexity considerations: O(index + weight_limit).
       **/
      executeOverweight: AugmentedSubmittable<(messageOrigin: CumulusPrimitivesCoreAggregateMessageOrigin | { Here: any } | { Parent: any } | { Sibling: any } | string | Uint8Array, page: u32 | AnyNumber | Uint8Array, index: u32 | AnyNumber | Uint8Array, weightLimit: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CumulusPrimitivesCoreAggregateMessageOrigin, u32, u32, SpWeightsWeightV2Weight]>;
      /**
       * Remove a page which has no more messages remaining to be processed or is stale.
       **/
      reapPage: AugmentedSubmittable<(messageOrigin: CumulusPrimitivesCoreAggregateMessageOrigin | { Here: any } | { Parent: any } | { Sibling: any } | string | Uint8Array, pageIndex: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CumulusPrimitivesCoreAggregateMessageOrigin, u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    nftaa: {
      /**
       * Approve item's attributes to be changed by a delegated third-party account.
       * 
       * Origin must be Signed and must be an owner of the `item`.
       * 
       * - `collection`: A collection of the item.
       * - `item`: The item that holds attributes.
       * - `delegate`: The account to delegate permission to change attributes of the item.
       * 
       * Emits `ItemAttributesApprovalAdded` on success.
       **/
      approveItemAttributes: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress]>;
      /**
       * Approve an item to be transferred by a delegated third-party account.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
       * `item`.
       * 
       * - `collection`: The collection of the item to be approved for delegated transfer.
       * - `item`: The item to be approved for delegated transfer.
       * - `delegate`: The account to delegate permission to transfer the item.
       * - `maybe_deadline`: Optional deadline for the approval. Specified by providing the
       * number of blocks after which the approval will expire
       * 
       * Emits `TransferApproved` on success.
       * 
       * Weight: `O(1)`
       **/
      approveTransfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, maybeDeadline: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, Option<u32>]>;
      /**
       * Destroy a single item.
       * 
       * The origin must conform to `ForceOrigin` or must be Signed and the signing account must
       * be the owner of the `item`.
       * 
       * - `collection`: The collection of the item to be burned.
       * - `item`: The item to be burned.
       * 
       * Emits `Burned`.
       * 
       * Weight: `O(1)`
       **/
      burn: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Allows to buy an item if it's up for sale.
       * 
       * Origin must be Signed and must not be the owner of the `item`.
       * 
       * - `collection`: The collection of the item.
       * - `item`: The item the sender wants to buy.
       * - `bid_price`: The price the sender is willing to pay.
       * 
       * Emits `ItemBought` on success.
       **/
      buyItem: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, bidPrice: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u128]>;
      /**
       * Cancel one of the transfer approvals for a specific item.
       * 
       * Origin must be either:
       * - the `Force` origin;
       * - `Signed` with the signer being the Owner of the `item`;
       * 
       * Arguments:
       * - `collection`: The collection of the item of whose approval will be cancelled.
       * - `item`: The item of the collection of whose approval will be cancelled.
       * - `delegate`: The account that is going to loose their approval.
       * 
       * Emits `ApprovalCancelled` on success.
       * 
       * Weight: `O(1)`
       **/
      cancelApproval: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress]>;
      /**
       * Cancel the previously provided approval to change item's attributes.
       * All the previously set attributes by the `delegate` will be removed.
       * 
       * Origin must be Signed and must be an owner of the `item`.
       * 
       * - `collection`: Collection that the item is contained within.
       * - `item`: The item that holds attributes.
       * - `delegate`: The previously approved account to remove.
       * 
       * Emits `ItemAttributesApprovalRemoved` on success.
       **/
      cancelItemAttributesApproval: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, witness: PalletNftsCancelAttributesApprovalWitness | { accountAttributes?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, PalletNftsCancelAttributesApprovalWitness]>;
      /**
       * Cancel an atomic swap.
       * 
       * Origin must be Signed.
       * Origin must be an owner of the `item` if the deadline hasn't expired.
       * 
       * - `collection`: The collection of the item.
       * - `item`: The item an owner wants to give.
       * 
       * Emits `SwapCancelled` on success.
       **/
      cancelSwap: AugmentedSubmittable<(offeredCollection: u32 | AnyNumber | Uint8Array, offeredItem: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Claim an atomic swap.
       * This method executes a pending swap, that was created by a counterpart before.
       * 
       * Origin must be Signed and must be an owner of the `item`.
       * 
       * - `send_collection`: The collection of the item to be sent.
       * - `send_item`: The item to be sent.
       * - `receive_collection`: The collection of the item to be received.
       * - `receive_item`: The item to be received.
       * - `witness_price`: A price that was previously agreed on.
       * 
       * Emits `SwapClaimed` on success.
       **/
      claimSwap: AugmentedSubmittable<(sendCollection: u32 | AnyNumber | Uint8Array, sendItem: u32 | AnyNumber | Uint8Array, receiveCollection: u32 | AnyNumber | Uint8Array, receiveItem: u32 | AnyNumber | Uint8Array, witnessPrice: Option<PalletNftsPriceWithDirection> | null | Uint8Array | PalletNftsPriceWithDirection | { amount?: any; direction?: any } | string) => SubmittableExtrinsic<ApiType>, [u32, u32, u32, u32, Option<PalletNftsPriceWithDirection>]>;
      /**
       * Cancel all the approvals of a specific item.
       * 
       * Origin must be either:
       * - the `Force` origin;
       * - `Signed` with the signer being the Owner of the `item`;
       * 
       * Arguments:
       * - `collection`: The collection of the item of whose approvals will be cleared.
       * - `item`: The item of the collection of whose approvals will be cleared.
       * 
       * Emits `AllApprovalsCancelled` on success.
       * 
       * Weight: `O(1)`
       **/
      clearAllTransferApprovals: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Clear an attribute for a collection or item.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
       * attribute.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to clear.
       * - `maybe_item`: The identifier of the item whose metadata to clear.
       * - `namespace`: Attribute's namespace.
       * - `key`: The key of the attribute.
       * 
       * Emits `AttributeCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearAttribute: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, namespace: PalletNftsAttributeNamespace | { Pallet: any } | { CollectionOwner: any } | { ItemOwner: any } | { Account: any } | string | Uint8Array, key: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<u32>, PalletNftsAttributeNamespace, Bytes]>;
      /**
       * Clear the metadata for a collection.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
       * the `collection`.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose metadata to clear.
       * 
       * Emits `CollectionMetadataCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearCollectionMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Clear the metadata for an item.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
       * `collection`.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to clear.
       * - `item`: The identifier of the item whose metadata to clear.
       * 
       * Emits `ItemMetadataCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Issue a new collection of non-fungible items from a public origin.
       * 
       * This new collection has no items initially and its owner is the origin.
       * 
       * The origin must be Signed and the sender must have sufficient funds free.
       * 
       * `CollectionDeposit` funds of sender are reserved.
       * 
       * Parameters:
       * - `admin`: The admin of this collection. The admin is the initial address of each
       * member of the collection's admin team.
       * 
       * Emits `Created` event when successful.
       * 
       * Weight: `O(1)`
       **/
      create: AugmentedSubmittable<(admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, config: PalletNftsCollectionConfig | { settings?: any; maxSupply?: any; mintSettings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, PalletNftsCollectionConfig]>;
      /**
       * Register a new atomic swap, declaring an intention to send an `item` in exchange for
       * `desired_item` from origin to target on the current blockchain.
       * The target can execute the swap during the specified `duration` of blocks (if set).
       * Additionally, the price could be set for the desired `item`.
       * 
       * Origin must be Signed and must be an owner of the `item`.
       * 
       * - `collection`: The collection of the item.
       * - `item`: The item an owner wants to give.
       * - `desired_collection`: The collection of the desired item.
       * - `desired_item`: The desired item an owner wants to receive.
       * - `maybe_price`: The price an owner is willing to pay or receive for the desired `item`.
       * - `duration`: A deadline for the swap. Specified by providing the number of blocks
       * after which the swap will expire.
       * 
       * Emits `SwapCreated` on success.
       **/
      createSwap: AugmentedSubmittable<(offeredCollection: u32 | AnyNumber | Uint8Array, offeredItem: u32 | AnyNumber | Uint8Array, desiredCollection: u32 | AnyNumber | Uint8Array, maybeDesiredItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, maybePrice: Option<PalletNftsPriceWithDirection> | null | Uint8Array | PalletNftsPriceWithDirection | { amount?: any; direction?: any } | string, duration: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u32, Option<u32>, Option<PalletNftsPriceWithDirection>, u32]>;
      /**
       * Destroy a collection of fungible items.
       * 
       * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
       * owner of the `collection`.
       * 
       * NOTE: The collection must have 0 items to be destroyed.
       * 
       * - `collection`: The identifier of the collection to be destroyed.
       * - `witness`: Information on the items minted in the collection. This must be
       * correct.
       * 
       * Emits `Destroyed` event when successful.
       * 
       * Weight: `O(m + c + a)` where:
       * - `m = witness.item_metadatas`
       * - `c = witness.item_configs`
       * - `a = witness.attributes`
       **/
      destroy: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, witness: PalletNftsDestroyWitness | { itemMetadatas?: any; itemConfigs?: any; attributes?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, PalletNftsDestroyWitness]>;
      /**
       * Change the config of a collection.
       * 
       * Origin must be `ForceOrigin`.
       * 
       * - `collection`: The identifier of the collection.
       * - `config`: The new config of this collection.
       * 
       * Emits `CollectionConfigChanged`.
       * 
       * Weight: `O(1)`
       **/
      forceCollectionConfig: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, config: PalletNftsCollectionConfig | { settings?: any; maxSupply?: any; mintSettings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, PalletNftsCollectionConfig]>;
      /**
       * Change the Owner of a collection.
       * 
       * Origin must be `ForceOrigin`.
       * 
       * - `collection`: The identifier of the collection.
       * - `owner`: The new Owner of this collection.
       * 
       * Emits `OwnerChanged`.
       * 
       * Weight: `O(1)`
       **/
      forceCollectionOwner: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, MultiAddress]>;
      /**
       * Issue a new collection of non-fungible items from a privileged origin.
       * 
       * This new collection has no items initially.
       * 
       * The origin must conform to `ForceOrigin`.
       * 
       * Unlike `create`, no funds are reserved.
       * 
       * - `owner`: The owner of this collection of items. The owner has full superuser
       * permissions over this item, but may later change and configure the permissions using
       * `transfer_ownership` and `set_team`.
       * 
       * Emits `ForceCreated` event when successful.
       * 
       * Weight: `O(1)`
       **/
      forceCreate: AugmentedSubmittable<(owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, config: PalletNftsCollectionConfig | { settings?: any; maxSupply?: any; mintSettings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, PalletNftsCollectionConfig]>;
      /**
       * Mint an item of a particular collection from a privileged origin.
       * 
       * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
       * Issuer of the `collection`.
       * 
       * - `collection`: The collection of the item to be minted.
       * - `item`: An identifier of the new item.
       * - `mint_to`: Account into which the item will be minted.
       * - `item_config`: A config of the new item.
       * 
       * Emits `Issued` event when successful.
       * 
       * Weight: `O(1)`
       **/
      forceMint: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, mintTo: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, itemConfig: PalletNftsItemConfig | { settings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, PalletNftsItemConfig]>;
      /**
       * Force-set an attribute for a collection or item.
       * 
       * Origin must be `ForceOrigin`.
       * 
       * If the attribute already exists and it was set by another account, the deposit
       * will be returned to the previous owner.
       * 
       * - `set_as`: An optional owner of the attribute.
       * - `collection`: The identifier of the collection whose item's metadata to set.
       * - `maybe_item`: The identifier of the item whose metadata to set.
       * - `namespace`: Attribute's namespace.
       * - `key`: The key of the attribute.
       * - `value`: The value to which to set the attribute.
       * 
       * Emits `AttributeSet`.
       * 
       * Weight: `O(1)`
       **/
      forceSetAttribute: AugmentedSubmittable<(setAs: Option<AccountId32> | null | Uint8Array | AccountId32 | string, collection: u32 | AnyNumber | Uint8Array, maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, namespace: PalletNftsAttributeNamespace | { Pallet: any } | { CollectionOwner: any } | { ItemOwner: any } | { Account: any } | string | Uint8Array, key: Bytes | string | Uint8Array, value: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Option<AccountId32>, u32, Option<u32>, PalletNftsAttributeNamespace, Bytes, Bytes]>;
      /**
       * Disallows specified settings for the whole collection.
       * 
       * Origin must be Signed and the sender should be the Owner of the `collection`.
       * 
       * - `collection`: The collection to be locked.
       * - `lock_settings`: The settings to be locked.
       * 
       * Note: it's possible to only lock(set) the setting, but not to unset it.
       * 
       * Emits `CollectionLocked`.
       * 
       * Weight: `O(1)`
       **/
      lockCollection: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, lockSettings: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u64]>;
      /**
       * Disallows changing the metadata or attributes of the item.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin
       * of the `collection`.
       * 
       * - `collection`: The collection if the `item`.
       * - `item`: An item to be locked.
       * - `lock_metadata`: Specifies whether the metadata should be locked.
       * - `lock_attributes`: Specifies whether the attributes in the `CollectionOwner` namespace
       * should be locked.
       * 
       * Note: `lock_attributes` affects the attributes in the `CollectionOwner` namespace only.
       * When the metadata or attributes are locked, it won't be possible the unlock them.
       * 
       * Emits `ItemPropertiesLocked`.
       * 
       * Weight: `O(1)`
       **/
      lockItemProperties: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, lockMetadata: bool | boolean | Uint8Array, lockAttributes: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, bool, bool]>;
      /**
       * Disallow further unprivileged transfer of an item.
       * 
       * Origin must be Signed and the sender should be the Freezer of the `collection`.
       * 
       * - `collection`: The collection of the item to be changed.
       * - `item`: The item to become non-transferable.
       * 
       * Emits `ItemTransferLocked`.
       * 
       * Weight: `O(1)`
       **/
      lockItemTransfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Mint an item of a particular collection.
       * 
       * The origin must be Signed and the sender must comply with the `mint_settings` rules.
       * 
       * - `collection`: The collection of the item to be minted.
       * - `item`: An identifier of the new item.
       * - `mint_to`: Account into which the item will be minted.
       * - `witness_data`: When the mint type is `HolderOf(collection_id)`, then the owned
       * item_id from that collection needs to be provided within the witness data object. If
       * the mint price is set, then it should be additionally confirmed in the `witness_data`.
       * 
       * Note: the deposit will be taken from the `origin` and not the `owner` of the `item`.
       * 
       * Emits `Issued` event when successful.
       * 
       * Weight: `O(1)`
       **/
      mint: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, mintTo: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, witnessData: Option<PalletNftsMintWitness> | null | Uint8Array | PalletNftsMintWitness | { ownedItem?: any; mintPrice?: any } | string) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, Option<PalletNftsMintWitness>]>;
      /**
       * Mint an item by providing the pre-signed approval.
       * 
       * Origin must be Signed.
       * 
       * - `mint_data`: The pre-signed approval that consists of the information about the item,
       * its metadata, attributes, who can mint it (`None` for anyone) and until what block
       * number.
       * - `signature`: The signature of the `data` object.
       * - `signer`: The `data` object's signer. Should be an Issuer of the collection.
       * 
       * Emits `Issued` on success.
       * Emits `AttributeSet` if the attributes were provided.
       * Emits `ItemMetadataSet` if the metadata was not empty.
       **/
      mintPreSigned: AugmentedSubmittable<(mintData: PalletNftsPreSignedMint | { collection?: any; item?: any; attributes?: any; metadata?: any; onlyAccount?: any; deadline?: any; mintPrice?: any } | string | Uint8Array, signature: SpRuntimeMultiSignature | { Ed25519: any } | { Sr25519: any } | { Ecdsa: any } | string | Uint8Array, signer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [PalletNftsPreSignedMint, SpRuntimeMultiSignature, AccountId32]>;
      /**
       * Allows to pay the tips.
       * 
       * Origin must be Signed.
       * 
       * - `tips`: Tips array.
       * 
       * Emits `TipSent` on every tip transfer.
       **/
      payTips: AugmentedSubmittable<(tips: Vec<PalletNftsItemTip> | (PalletNftsItemTip | { collection?: any; item?: any; receiver?: any; amount?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<PalletNftsItemTip>]>;
      /**
       * Execute a call through an NFTAA
       * 
       * The origin must be Signed and must be the owner of the NFTAA.
       * The NFTAA must not be listed for sale.
       * 
       * Parameters:
       * - `collection`: The collection ID of the NFTAA
       * - `item`: The item ID of the NFTAA
       * - `call`: The call to be executed
       **/
      proxyCall: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, Call]>;
      /**
       * Re-evaluate the deposits on some items.
       * 
       * Origin must be Signed and the sender should be the Owner of the `collection`.
       * 
       * - `collection`: The collection of the items to be reevaluated.
       * - `items`: The items of the collection whose deposits will be reevaluated.
       * 
       * NOTE: This exists as a best-effort function. Any items which are unknown or
       * in the case that the owner account does not have reservable funds to pay for a
       * deposit increase are ignored. Generally the owner isn't going to call this on items
       * whose existing deposit is less than the refreshed deposit as it would only cost them,
       * so it's of little consequence.
       * 
       * It will still return an error in the case that the collection is unknown or the signer
       * is not permitted to call it.
       * 
       * Weight: `O(items.len())`
       **/
      redeposit: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, items: Vec<u32> | (u32 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [u32, Vec<u32>]>;
      /**
       * Set (or reset) the acceptance of ownership for a particular account.
       * 
       * Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
       * provider reference.
       * 
       * - `maybe_collection`: The identifier of the collection whose ownership the signer is
       * willing to accept, or if `None`, an indication that the signer is willing to accept no
       * ownership transferal.
       * 
       * Emits `OwnershipAcceptanceChanged`.
       **/
      setAcceptOwnership: AugmentedSubmittable<(maybeCollection: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Option<u32>]>;
      /**
       * Set an attribute for a collection or item.
       * 
       * Origin must be Signed and must conform to the namespace ruleset:
       * - `CollectionOwner` namespace could be modified by the `collection` Admin only;
       * - `ItemOwner` namespace could be modified by the `maybe_item` owner only. `maybe_item`
       * should be set in that case;
       * - `Account(AccountId)` namespace could be modified only when the `origin` was given a
       * permission to do so;
       * 
       * The funds of `origin` are reserved according to the formula:
       * `AttributeDepositBase + DepositPerByte * (key.len + value.len)` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to set.
       * - `maybe_item`: The identifier of the item whose metadata to set.
       * - `namespace`: Attribute's namespace.
       * - `key`: The key of the attribute.
       * - `value`: The value to which to set the attribute.
       * 
       * Emits `AttributeSet`.
       * 
       * Weight: `O(1)`
       **/
      setAttribute: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, namespace: PalletNftsAttributeNamespace | { Pallet: any } | { CollectionOwner: any } | { ItemOwner: any } | { Account: any } | string | Uint8Array, key: Bytes | string | Uint8Array, value: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<u32>, PalletNftsAttributeNamespace, Bytes, Bytes]>;
      /**
       * Set the maximum number of items a collection could have.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
       * the `collection`.
       * 
       * - `collection`: The identifier of the collection to change.
       * - `max_supply`: The maximum number of items a collection could have.
       * 
       * Emits `CollectionMaxSupplySet` event when successful.
       **/
      setCollectionMaxSupply: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, maxSupply: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Set the metadata for a collection.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
       * the `collection`.
       * 
       * If the origin is `Signed`, then funds of signer are reserved according to the formula:
       * `MetadataDepositBase + DepositPerByte * data.len` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the item whose metadata to update.
       * - `data`: The general information of this item. Limited in length by `StringLimit`.
       * 
       * Emits `CollectionMetadataSet`.
       * 
       * Weight: `O(1)`
       **/
      setCollectionMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Bytes]>;
      /**
       * Set the metadata for an item.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
       * `collection`.
       * 
       * If the origin is Signed, then funds of signer are reserved according to the formula:
       * `MetadataDepositBase + DepositPerByte * data.len` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to set.
       * - `item`: The identifier of the item whose metadata to set.
       * - `data`: The general information of this item. Limited in length by `StringLimit`.
       * 
       * Emits `ItemMetadataSet`.
       * 
       * Weight: `O(1)`
       **/
      setMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, Bytes]>;
      /**
       * Set (or reset) the price for an item.
       * 
       * Origin must be Signed and must be the owner of the `item`.
       * 
       * - `collection`: The collection of the item.
       * - `item`: The item to set the price for.
       * - `price`: The price for the item. Pass `None`, to reset the price.
       * - `buyer`: Restricts the buy operation to a specific account.
       * 
       * Emits `ItemPriceSet` on success if the price is not `None`.
       * Emits `ItemPriceRemoved` on success if the price is `None`.
       **/
      setPrice: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, price: Option<u128> | null | Uint8Array | u128 | AnyNumber, whitelistedBuyer: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string) => SubmittableExtrinsic<ApiType>, [u32, u32, Option<u128>, Option<MultiAddress>]>;
      /**
       * Change the Issuer, Admin and Freezer of a collection.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
       * `collection`.
       * 
       * Note: by setting the role to `None` only the `ForceOrigin` will be able to change it
       * after to `Some(account)`.
       * 
       * - `collection`: The collection whose team should be changed.
       * - `issuer`: The new Issuer of this collection.
       * - `admin`: The new Admin of this collection.
       * - `freezer`: The new Freezer of this collection.
       * 
       * Emits `TeamChanged`.
       * 
       * Weight: `O(1)`
       **/
      setTeam: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, issuer: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, admin: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, freezer: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string) => SubmittableExtrinsic<ApiType>, [u32, Option<MultiAddress>, Option<MultiAddress>, Option<MultiAddress>]>;
      /**
       * Move an item from the sender account to another.
       * 
       * Origin must be Signed and the signing account must be either:
       * - the Owner of the `item`;
       * - the approved delegate for the `item` (in this case, the approval is reset).
       * 
       * Arguments:
       * - `collection`: The collection of the item to be transferred.
       * - `item`: The item to be transferred.
       * - `dest`: The account to receive ownership of the item.
       * 
       * Emits `Transferred`.
       * 
       * Weight: `O(1)`
       **/
      transfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress]>;
      /**
       * Change the Owner of a collection.
       * 
       * Origin must be Signed and the sender should be the Owner of the `collection`.
       * 
       * - `collection`: The collection whose owner should be changed.
       * - `owner`: The new Owner of this collection. They must have called
       * `set_accept_ownership` with `collection` in order for this operation to succeed.
       * 
       * Emits `OwnerChanged`.
       * 
       * Weight: `O(1)`
       **/
      transferOwnership: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, newOwner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, MultiAddress]>;
      /**
       * Re-allow unprivileged transfer of an item.
       * 
       * Origin must be Signed and the sender should be the Freezer of the `collection`.
       * 
       * - `collection`: The collection of the item to be changed.
       * - `item`: The item to become transferable.
       * 
       * Emits `ItemTransferUnlocked`.
       * 
       * Weight: `O(1)`
       **/
      unlockItemTransfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Update mint settings.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer
       * of the `collection`.
       * 
       * - `collection`: The identifier of the collection to change.
       * - `mint_settings`: The new mint settings.
       * 
       * Emits `CollectionMintSettingsUpdated` event when successful.
       **/
      updateMintSettings: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, mintSettings: PalletNftsMintSettings | { mintType?: any; price?: any; startBlock?: any; endBlock?: any; defaultItemSettings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, PalletNftsMintSettings]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    nfts: {
      /**
       * Approve item's attributes to be changed by a delegated third-party account.
       * 
       * Origin must be Signed and must be an owner of the `item`.
       * 
       * - `collection`: A collection of the item.
       * - `item`: The item that holds attributes.
       * - `delegate`: The account to delegate permission to change attributes of the item.
       * 
       * Emits `ItemAttributesApprovalAdded` on success.
       **/
      approveItemAttributes: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress]>;
      /**
       * Approve an item to be transferred by a delegated third-party account.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
       * `item`.
       * 
       * - `collection`: The collection of the item to be approved for delegated transfer.
       * - `item`: The item to be approved for delegated transfer.
       * - `delegate`: The account to delegate permission to transfer the item.
       * - `maybe_deadline`: Optional deadline for the approval. Specified by providing the
       * number of blocks after which the approval will expire
       * 
       * Emits `TransferApproved` on success.
       * 
       * Weight: `O(1)`
       **/
      approveTransfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, maybeDeadline: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, Option<u32>]>;
      /**
       * Destroy a single item.
       * 
       * The origin must conform to `ForceOrigin` or must be Signed and the signing account must
       * be the owner of the `item`.
       * 
       * - `collection`: The collection of the item to be burned.
       * - `item`: The item to be burned.
       * 
       * Emits `Burned`.
       * 
       * Weight: `O(1)`
       **/
      burn: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Allows to buy an item if it's up for sale.
       * 
       * Origin must be Signed and must not be the owner of the `item`.
       * 
       * - `collection`: The collection of the item.
       * - `item`: The item the sender wants to buy.
       * - `bid_price`: The price the sender is willing to pay.
       * 
       * Emits `ItemBought` on success.
       **/
      buyItem: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, bidPrice: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u128]>;
      /**
       * Cancel one of the transfer approvals for a specific item.
       * 
       * Origin must be either:
       * - the `Force` origin;
       * - `Signed` with the signer being the Owner of the `item`;
       * 
       * Arguments:
       * - `collection`: The collection of the item of whose approval will be cancelled.
       * - `item`: The item of the collection of whose approval will be cancelled.
       * - `delegate`: The account that is going to loose their approval.
       * 
       * Emits `ApprovalCancelled` on success.
       * 
       * Weight: `O(1)`
       **/
      cancelApproval: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress]>;
      /**
       * Cancel the previously provided approval to change item's attributes.
       * All the previously set attributes by the `delegate` will be removed.
       * 
       * Origin must be Signed and must be an owner of the `item`.
       * 
       * - `collection`: Collection that the item is contained within.
       * - `item`: The item that holds attributes.
       * - `delegate`: The previously approved account to remove.
       * 
       * Emits `ItemAttributesApprovalRemoved` on success.
       **/
      cancelItemAttributesApproval: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, witness: PalletNftsCancelAttributesApprovalWitness | { accountAttributes?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, PalletNftsCancelAttributesApprovalWitness]>;
      /**
       * Cancel an atomic swap.
       * 
       * Origin must be Signed.
       * Origin must be an owner of the `item` if the deadline hasn't expired.
       * 
       * - `collection`: The collection of the item.
       * - `item`: The item an owner wants to give.
       * 
       * Emits `SwapCancelled` on success.
       **/
      cancelSwap: AugmentedSubmittable<(offeredCollection: u32 | AnyNumber | Uint8Array, offeredItem: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Claim an atomic swap.
       * This method executes a pending swap, that was created by a counterpart before.
       * 
       * Origin must be Signed and must be an owner of the `item`.
       * 
       * - `send_collection`: The collection of the item to be sent.
       * - `send_item`: The item to be sent.
       * - `receive_collection`: The collection of the item to be received.
       * - `receive_item`: The item to be received.
       * - `witness_price`: A price that was previously agreed on.
       * 
       * Emits `SwapClaimed` on success.
       **/
      claimSwap: AugmentedSubmittable<(sendCollection: u32 | AnyNumber | Uint8Array, sendItem: u32 | AnyNumber | Uint8Array, receiveCollection: u32 | AnyNumber | Uint8Array, receiveItem: u32 | AnyNumber | Uint8Array, witnessPrice: Option<PalletNftsPriceWithDirection> | null | Uint8Array | PalletNftsPriceWithDirection | { amount?: any; direction?: any } | string) => SubmittableExtrinsic<ApiType>, [u32, u32, u32, u32, Option<PalletNftsPriceWithDirection>]>;
      /**
       * Cancel all the approvals of a specific item.
       * 
       * Origin must be either:
       * - the `Force` origin;
       * - `Signed` with the signer being the Owner of the `item`;
       * 
       * Arguments:
       * - `collection`: The collection of the item of whose approvals will be cleared.
       * - `item`: The item of the collection of whose approvals will be cleared.
       * 
       * Emits `AllApprovalsCancelled` on success.
       * 
       * Weight: `O(1)`
       **/
      clearAllTransferApprovals: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Clear an attribute for a collection or item.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
       * attribute.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to clear.
       * - `maybe_item`: The identifier of the item whose metadata to clear.
       * - `namespace`: Attribute's namespace.
       * - `key`: The key of the attribute.
       * 
       * Emits `AttributeCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearAttribute: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, namespace: PalletNftsAttributeNamespace | { Pallet: any } | { CollectionOwner: any } | { ItemOwner: any } | { Account: any } | string | Uint8Array, key: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<u32>, PalletNftsAttributeNamespace, Bytes]>;
      /**
       * Clear the metadata for a collection.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
       * the `collection`.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose metadata to clear.
       * 
       * Emits `CollectionMetadataCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearCollectionMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Clear the metadata for an item.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
       * `collection`.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to clear.
       * - `item`: The identifier of the item whose metadata to clear.
       * 
       * Emits `ItemMetadataCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Issue a new collection of non-fungible items from a public origin.
       * 
       * This new collection has no items initially and its owner is the origin.
       * 
       * The origin must be Signed and the sender must have sufficient funds free.
       * 
       * `CollectionDeposit` funds of sender are reserved.
       * 
       * Parameters:
       * - `admin`: The admin of this collection. The admin is the initial address of each
       * member of the collection's admin team.
       * 
       * Emits `Created` event when successful.
       * 
       * Weight: `O(1)`
       **/
      create: AugmentedSubmittable<(admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, config: PalletNftsCollectionConfig | { settings?: any; maxSupply?: any; mintSettings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, PalletNftsCollectionConfig]>;
      /**
       * Register a new atomic swap, declaring an intention to send an `item` in exchange for
       * `desired_item` from origin to target on the current blockchain.
       * The target can execute the swap during the specified `duration` of blocks (if set).
       * Additionally, the price could be set for the desired `item`.
       * 
       * Origin must be Signed and must be an owner of the `item`.
       * 
       * - `collection`: The collection of the item.
       * - `item`: The item an owner wants to give.
       * - `desired_collection`: The collection of the desired item.
       * - `desired_item`: The desired item an owner wants to receive.
       * - `maybe_price`: The price an owner is willing to pay or receive for the desired `item`.
       * - `duration`: A deadline for the swap. Specified by providing the number of blocks
       * after which the swap will expire.
       * 
       * Emits `SwapCreated` on success.
       **/
      createSwap: AugmentedSubmittable<(offeredCollection: u32 | AnyNumber | Uint8Array, offeredItem: u32 | AnyNumber | Uint8Array, desiredCollection: u32 | AnyNumber | Uint8Array, maybeDesiredItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, maybePrice: Option<PalletNftsPriceWithDirection> | null | Uint8Array | PalletNftsPriceWithDirection | { amount?: any; direction?: any } | string, duration: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u32, Option<u32>, Option<PalletNftsPriceWithDirection>, u32]>;
      /**
       * Destroy a collection of fungible items.
       * 
       * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
       * owner of the `collection`.
       * 
       * NOTE: The collection must have 0 items to be destroyed.
       * 
       * - `collection`: The identifier of the collection to be destroyed.
       * - `witness`: Information on the items minted in the collection. This must be
       * correct.
       * 
       * Emits `Destroyed` event when successful.
       * 
       * Weight: `O(m + c + a)` where:
       * - `m = witness.item_metadatas`
       * - `c = witness.item_configs`
       * - `a = witness.attributes`
       **/
      destroy: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, witness: PalletNftsDestroyWitness | { itemMetadatas?: any; itemConfigs?: any; attributes?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, PalletNftsDestroyWitness]>;
      /**
       * Change the config of a collection.
       * 
       * Origin must be `ForceOrigin`.
       * 
       * - `collection`: The identifier of the collection.
       * - `config`: The new config of this collection.
       * 
       * Emits `CollectionConfigChanged`.
       * 
       * Weight: `O(1)`
       **/
      forceCollectionConfig: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, config: PalletNftsCollectionConfig | { settings?: any; maxSupply?: any; mintSettings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, PalletNftsCollectionConfig]>;
      /**
       * Change the Owner of a collection.
       * 
       * Origin must be `ForceOrigin`.
       * 
       * - `collection`: The identifier of the collection.
       * - `owner`: The new Owner of this collection.
       * 
       * Emits `OwnerChanged`.
       * 
       * Weight: `O(1)`
       **/
      forceCollectionOwner: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, MultiAddress]>;
      /**
       * Issue a new collection of non-fungible items from a privileged origin.
       * 
       * This new collection has no items initially.
       * 
       * The origin must conform to `ForceOrigin`.
       * 
       * Unlike `create`, no funds are reserved.
       * 
       * - `owner`: The owner of this collection of items. The owner has full superuser
       * permissions over this item, but may later change and configure the permissions using
       * `transfer_ownership` and `set_team`.
       * 
       * Emits `ForceCreated` event when successful.
       * 
       * Weight: `O(1)`
       **/
      forceCreate: AugmentedSubmittable<(owner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, config: PalletNftsCollectionConfig | { settings?: any; maxSupply?: any; mintSettings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, PalletNftsCollectionConfig]>;
      /**
       * Mint an item of a particular collection from a privileged origin.
       * 
       * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
       * Issuer of the `collection`.
       * 
       * - `collection`: The collection of the item to be minted.
       * - `item`: An identifier of the new item.
       * - `mint_to`: Account into which the item will be minted.
       * - `item_config`: A config of the new item.
       * 
       * Emits `Issued` event when successful.
       * 
       * Weight: `O(1)`
       **/
      forceMint: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, mintTo: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, itemConfig: PalletNftsItemConfig | { settings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, PalletNftsItemConfig]>;
      /**
       * Force-set an attribute for a collection or item.
       * 
       * Origin must be `ForceOrigin`.
       * 
       * If the attribute already exists and it was set by another account, the deposit
       * will be returned to the previous owner.
       * 
       * - `set_as`: An optional owner of the attribute.
       * - `collection`: The identifier of the collection whose item's metadata to set.
       * - `maybe_item`: The identifier of the item whose metadata to set.
       * - `namespace`: Attribute's namespace.
       * - `key`: The key of the attribute.
       * - `value`: The value to which to set the attribute.
       * 
       * Emits `AttributeSet`.
       * 
       * Weight: `O(1)`
       **/
      forceSetAttribute: AugmentedSubmittable<(setAs: Option<AccountId32> | null | Uint8Array | AccountId32 | string, collection: u32 | AnyNumber | Uint8Array, maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, namespace: PalletNftsAttributeNamespace | { Pallet: any } | { CollectionOwner: any } | { ItemOwner: any } | { Account: any } | string | Uint8Array, key: Bytes | string | Uint8Array, value: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Option<AccountId32>, u32, Option<u32>, PalletNftsAttributeNamespace, Bytes, Bytes]>;
      /**
       * Disallows specified settings for the whole collection.
       * 
       * Origin must be Signed and the sender should be the Owner of the `collection`.
       * 
       * - `collection`: The collection to be locked.
       * - `lock_settings`: The settings to be locked.
       * 
       * Note: it's possible to only lock(set) the setting, but not to unset it.
       * 
       * Emits `CollectionLocked`.
       * 
       * Weight: `O(1)`
       **/
      lockCollection: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, lockSettings: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u64]>;
      /**
       * Disallows changing the metadata or attributes of the item.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin
       * of the `collection`.
       * 
       * - `collection`: The collection if the `item`.
       * - `item`: An item to be locked.
       * - `lock_metadata`: Specifies whether the metadata should be locked.
       * - `lock_attributes`: Specifies whether the attributes in the `CollectionOwner` namespace
       * should be locked.
       * 
       * Note: `lock_attributes` affects the attributes in the `CollectionOwner` namespace only.
       * When the metadata or attributes are locked, it won't be possible the unlock them.
       * 
       * Emits `ItemPropertiesLocked`.
       * 
       * Weight: `O(1)`
       **/
      lockItemProperties: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, lockMetadata: bool | boolean | Uint8Array, lockAttributes: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, bool, bool]>;
      /**
       * Disallow further unprivileged transfer of an item.
       * 
       * Origin must be Signed and the sender should be the Freezer of the `collection`.
       * 
       * - `collection`: The collection of the item to be changed.
       * - `item`: The item to become non-transferable.
       * 
       * Emits `ItemTransferLocked`.
       * 
       * Weight: `O(1)`
       **/
      lockItemTransfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Mint an item of a particular collection.
       * 
       * The origin must be Signed and the sender must comply with the `mint_settings` rules.
       * 
       * - `collection`: The collection of the item to be minted.
       * - `item`: An identifier of the new item.
       * - `mint_to`: Account into which the item will be minted.
       * - `witness_data`: When the mint type is `HolderOf(collection_id)`, then the owned
       * item_id from that collection needs to be provided within the witness data object. If
       * the mint price is set, then it should be additionally confirmed in the `witness_data`.
       * 
       * Note: the deposit will be taken from the `origin` and not the `owner` of the `item`.
       * 
       * Emits `Issued` event when successful.
       * 
       * Weight: `O(1)`
       **/
      mint: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, mintTo: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, witnessData: Option<PalletNftsMintWitness> | null | Uint8Array | PalletNftsMintWitness | { ownedItem?: any; mintPrice?: any } | string) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, Option<PalletNftsMintWitness>]>;
      /**
       * Mint an item by providing the pre-signed approval.
       * 
       * Origin must be Signed.
       * 
       * - `mint_data`: The pre-signed approval that consists of the information about the item,
       * its metadata, attributes, who can mint it (`None` for anyone) and until what block
       * number.
       * - `signature`: The signature of the `data` object.
       * - `signer`: The `data` object's signer. Should be an Issuer of the collection.
       * 
       * Emits `Issued` on success.
       * Emits `AttributeSet` if the attributes were provided.
       * Emits `ItemMetadataSet` if the metadata was not empty.
       **/
      mintPreSigned: AugmentedSubmittable<(mintData: PalletNftsPreSignedMint | { collection?: any; item?: any; attributes?: any; metadata?: any; onlyAccount?: any; deadline?: any; mintPrice?: any } | string | Uint8Array, signature: SpRuntimeMultiSignature | { Ed25519: any } | { Sr25519: any } | { Ecdsa: any } | string | Uint8Array, signer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [PalletNftsPreSignedMint, SpRuntimeMultiSignature, AccountId32]>;
      /**
       * Allows to pay the tips.
       * 
       * Origin must be Signed.
       * 
       * - `tips`: Tips array.
       * 
       * Emits `TipSent` on every tip transfer.
       **/
      payTips: AugmentedSubmittable<(tips: Vec<PalletNftsItemTip> | (PalletNftsItemTip | { collection?: any; item?: any; receiver?: any; amount?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<PalletNftsItemTip>]>;
      /**
       * Re-evaluate the deposits on some items.
       * 
       * Origin must be Signed and the sender should be the Owner of the `collection`.
       * 
       * - `collection`: The collection of the items to be reevaluated.
       * - `items`: The items of the collection whose deposits will be reevaluated.
       * 
       * NOTE: This exists as a best-effort function. Any items which are unknown or
       * in the case that the owner account does not have reservable funds to pay for a
       * deposit increase are ignored. Generally the owner isn't going to call this on items
       * whose existing deposit is less than the refreshed deposit as it would only cost them,
       * so it's of little consequence.
       * 
       * It will still return an error in the case that the collection is unknown or the signer
       * is not permitted to call it.
       * 
       * Weight: `O(items.len())`
       **/
      redeposit: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, items: Vec<u32> | (u32 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [u32, Vec<u32>]>;
      /**
       * Set (or reset) the acceptance of ownership for a particular account.
       * 
       * Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
       * provider reference.
       * 
       * - `maybe_collection`: The identifier of the collection whose ownership the signer is
       * willing to accept, or if `None`, an indication that the signer is willing to accept no
       * ownership transferal.
       * 
       * Emits `OwnershipAcceptanceChanged`.
       **/
      setAcceptOwnership: AugmentedSubmittable<(maybeCollection: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Option<u32>]>;
      /**
       * Set an attribute for a collection or item.
       * 
       * Origin must be Signed and must conform to the namespace ruleset:
       * - `CollectionOwner` namespace could be modified by the `collection` Admin only;
       * - `ItemOwner` namespace could be modified by the `maybe_item` owner only. `maybe_item`
       * should be set in that case;
       * - `Account(AccountId)` namespace could be modified only when the `origin` was given a
       * permission to do so;
       * 
       * The funds of `origin` are reserved according to the formula:
       * `AttributeDepositBase + DepositPerByte * (key.len + value.len)` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to set.
       * - `maybe_item`: The identifier of the item whose metadata to set.
       * - `namespace`: Attribute's namespace.
       * - `key`: The key of the attribute.
       * - `value`: The value to which to set the attribute.
       * 
       * Emits `AttributeSet`.
       * 
       * Weight: `O(1)`
       **/
      setAttribute: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, namespace: PalletNftsAttributeNamespace | { Pallet: any } | { CollectionOwner: any } | { ItemOwner: any } | { Account: any } | string | Uint8Array, key: Bytes | string | Uint8Array, value: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<u32>, PalletNftsAttributeNamespace, Bytes, Bytes]>;
      /**
       * Set attributes for an item by providing the pre-signed approval.
       * 
       * Origin must be Signed and must be an owner of the `data.item`.
       * 
       * - `data`: The pre-signed approval that consists of the information about the item,
       * attributes to update and until what block number.
       * - `signature`: The signature of the `data` object.
       * - `signer`: The `data` object's signer. Should be an Admin of the collection for the
       * `CollectionOwner` namespace.
       * 
       * Emits `AttributeSet` for each provided attribute.
       * Emits `ItemAttributesApprovalAdded` if the approval wasn't set before.
       * Emits `PreSignedAttributesSet` on success.
       **/
      setAttributesPreSigned: AugmentedSubmittable<(data: PalletNftsPreSignedAttributes | { collection?: any; item?: any; attributes?: any; namespace?: any; deadline?: any } | string | Uint8Array, signature: SpRuntimeMultiSignature | { Ed25519: any } | { Sr25519: any } | { Ecdsa: any } | string | Uint8Array, signer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [PalletNftsPreSignedAttributes, SpRuntimeMultiSignature, AccountId32]>;
      /**
       * Set the maximum number of items a collection could have.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
       * the `collection`.
       * 
       * - `collection`: The identifier of the collection to change.
       * - `max_supply`: The maximum number of items a collection could have.
       * 
       * Emits `CollectionMaxSupplySet` event when successful.
       **/
      setCollectionMaxSupply: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, maxSupply: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Set the metadata for a collection.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
       * the `collection`.
       * 
       * If the origin is `Signed`, then funds of signer are reserved according to the formula:
       * `MetadataDepositBase + DepositPerByte * data.len` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the item whose metadata to update.
       * - `data`: The general information of this item. Limited in length by `StringLimit`.
       * 
       * Emits `CollectionMetadataSet`.
       * 
       * Weight: `O(1)`
       **/
      setCollectionMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Bytes]>;
      /**
       * Set the metadata for an item.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
       * `collection`.
       * 
       * If the origin is Signed, then funds of signer are reserved according to the formula:
       * `MetadataDepositBase + DepositPerByte * data.len` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to set.
       * - `item`: The identifier of the item whose metadata to set.
       * - `data`: The general information of this item. Limited in length by `StringLimit`.
       * 
       * Emits `ItemMetadataSet`.
       * 
       * Weight: `O(1)`
       **/
      setMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, Bytes]>;
      /**
       * Set (or reset) the price for an item.
       * 
       * Origin must be Signed and must be the owner of the `item`.
       * 
       * - `collection`: The collection of the item.
       * - `item`: The item to set the price for.
       * - `price`: The price for the item. Pass `None`, to reset the price.
       * - `buyer`: Restricts the buy operation to a specific account.
       * 
       * Emits `ItemPriceSet` on success if the price is not `None`.
       * Emits `ItemPriceRemoved` on success if the price is `None`.
       **/
      setPrice: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, price: Option<u128> | null | Uint8Array | u128 | AnyNumber, whitelistedBuyer: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string) => SubmittableExtrinsic<ApiType>, [u32, u32, Option<u128>, Option<MultiAddress>]>;
      /**
       * Change the Issuer, Admin and Freezer of a collection.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
       * `collection`.
       * 
       * Note: by setting the role to `None` only the `ForceOrigin` will be able to change it
       * after to `Some(account)`.
       * 
       * - `collection`: The collection whose team should be changed.
       * - `issuer`: The new Issuer of this collection.
       * - `admin`: The new Admin of this collection.
       * - `freezer`: The new Freezer of this collection.
       * 
       * Emits `TeamChanged`.
       * 
       * Weight: `O(1)`
       **/
      setTeam: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, issuer: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, admin: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, freezer: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string) => SubmittableExtrinsic<ApiType>, [u32, Option<MultiAddress>, Option<MultiAddress>, Option<MultiAddress>]>;
      /**
       * Move an item from the sender account to another.
       * 
       * Origin must be Signed and the signing account must be either:
       * - the Owner of the `item`;
       * - the approved delegate for the `item` (in this case, the approval is reset).
       * 
       * Arguments:
       * - `collection`: The collection of the item to be transferred.
       * - `item`: The item to be transferred.
       * - `dest`: The account to receive ownership of the item.
       * 
       * Emits `Transferred`.
       * 
       * Weight: `O(1)`
       **/
      transfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress]>;
      /**
       * Change the Owner of a collection.
       * 
       * Origin must be Signed and the sender should be the Owner of the `collection`.
       * 
       * - `collection`: The collection whose owner should be changed.
       * - `owner`: The new Owner of this collection. They must have called
       * `set_accept_ownership` with `collection` in order for this operation to succeed.
       * 
       * Emits `OwnerChanged`.
       * 
       * Weight: `O(1)`
       **/
      transferOwnership: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, newOwner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, MultiAddress]>;
      /**
       * Re-allow unprivileged transfer of an item.
       * 
       * Origin must be Signed and the sender should be the Freezer of the `collection`.
       * 
       * - `collection`: The collection of the item to be changed.
       * - `item`: The item to become transferable.
       * 
       * Emits `ItemTransferUnlocked`.
       * 
       * Weight: `O(1)`
       **/
      unlockItemTransfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Update mint settings.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer
       * of the `collection`.
       * 
       * - `collection`: The identifier of the collection to change.
       * - `mint_settings`: The new mint settings.
       * 
       * Emits `CollectionMintSettingsUpdated` event when successful.
       **/
      updateMintSettings: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, mintSettings: PalletNftsMintSettings | { mintType?: any; price?: any; startBlock?: any; endBlock?: any; defaultItemSettings?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, PalletNftsMintSettings]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    parachainInfo: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    parachainSystem: {
      /**
       * Set the current validation data.
       * 
       * This should be invoked exactly once per block. It will panic at the finalization
       * phase if the call was not invoked.
       * 
       * The dispatch origin for this call must be `Inherent`
       * 
       * As a side effect, this function upgrades the current validation function
       * if the appropriate time has come.
       **/
      setValidationData: AugmentedSubmittable<(data: CumulusPrimitivesParachainInherentParachainInherentData | { validationData?: any; relayChainState?: any; downwardMessages?: any; horizontalMessages?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CumulusPrimitivesParachainInherentParachainInherentData]>;
      sudoSendUpwardMessage: AugmentedSubmittable<(message: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    polkadotXcm: {
      /**
       * Authorize another `aliaser` location to alias into the local `origin` making this call.
       * The `aliaser` is only authorized until the provided `expiry` block number.
       * The call can also be used for a previously authorized alias in order to update its
       * `expiry` block number.
       * 
       * Usually useful to allow your local account to be aliased into from a remote location
       * also under your control (like your account on another chain).
       * 
       * WARNING: make sure the caller `origin` (you) trusts the `aliaser` location to act in
       * their/your name. Once authorized using this call, the `aliaser` can freely impersonate
       * `origin` in XCM programs executed on the local chain.
       **/
      addAuthorizedAlias: AugmentedSubmittable<(aliaser: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, expires: Option<u64> | null | Uint8Array | u64 | AnyNumber) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, Option<u64>]>;
      /**
       * Claims assets trapped on this pallet because of leftover assets during XCM execution.
       * 
       * - `origin`: Anyone can call this extrinsic.
       * - `assets`: The exact assets that were trapped. Use the version to specify what version
       * was the latest when they were trapped.
       * - `beneficiary`: The location/account where the claimed assets will be deposited.
       **/
      claimAssets: AugmentedSubmittable<(assets: XcmVersionedAssets | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedAssets, XcmVersionedLocation]>;
      /**
       * Execute an XCM message from a local, signed, origin.
       * 
       * An event is deposited indicating whether `msg` could be executed completely or only
       * partially.
       * 
       * No more than `max_weight` will be used in its attempted execution. If this is less than
       * the maximum amount of weight that the message could take to be executed, then no
       * execution attempt will be made.
       **/
      execute: AugmentedSubmittable<(message: XcmVersionedXcm | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedXcm, SpWeightsWeightV2Weight]>;
      /**
       * Set a safe XCM version (the version that XCM should be encoded with if the most recent
       * version a destination can accept is unknown).
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
       **/
      forceDefaultXcmVersion: AugmentedSubmittable<(maybeXcmVersion: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Option<u32>]>;
      /**
       * Ask a location to notify us regarding their XCM version and any changes to it.
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `location`: The location to which we should subscribe for XCM version notifications.
       **/
      forceSubscribeVersionNotify: AugmentedSubmittable<(location: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation]>;
      /**
       * Set or unset the global suspension state of the XCM executor.
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `suspended`: `true` to suspend, `false` to resume.
       **/
      forceSuspension: AugmentedSubmittable<(suspended: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [bool]>;
      /**
       * Require that a particular destination should no longer notify us regarding any XCM
       * version changes.
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `location`: The location to which we are currently subscribed for XCM version
       * notifications which we no longer desire.
       **/
      forceUnsubscribeVersionNotify: AugmentedSubmittable<(location: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation]>;
      /**
       * Extoll that a particular destination can be communicated with through a particular
       * version of XCM.
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `location`: The destination that is being described.
       * - `xcm_version`: The latest version of XCM that `location` supports.
       **/
      forceXcmVersion: AugmentedSubmittable<(location: StagingXcmV5Location | { parents?: any; interior?: any } | string | Uint8Array, version: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [StagingXcmV5Location, u32]>;
      /**
       * Transfer some assets from the local chain to the destination chain through their local,
       * destination or remote reserve.
       * 
       * `assets` must have same reserve location and may not be teleportable to `dest`.
       * - `assets` have local reserve: transfer assets to sovereign account of destination
       * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
       * assets to `beneficiary`.
       * - `assets` have destination reserve: burn local assets and forward a notification to
       * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
       * deposit them to `beneficiary`.
       * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
       * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
       * to mint and deposit reserve-based assets to `beneficiary`.
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
       * is needed than `weight_limit`, then the operation will fail and the sent assets may be
       * at risk.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` (and possibly reserve) chains.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
       **/
      limitedReserveTransferAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, assets: XcmVersionedAssets | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array, weightLimit: XcmV3WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32, XcmV3WeightLimit]>;
      /**
       * Teleport some assets from the local chain to some destination chain.
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
       * is needed than `weight_limit`, then the operation will fail and the sent assets may be
       * at risk.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` chain.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
       **/
      limitedTeleportAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, assets: XcmVersionedAssets | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array, weightLimit: XcmV3WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32, XcmV3WeightLimit]>;
      /**
       * Remove all previously authorized `aliaser`s that can alias into the local `origin`
       * making this call.
       **/
      removeAllAuthorizedAliases: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Remove a previously authorized `aliaser` from the list of locations that can alias into
       * the local `origin` making this call.
       **/
      removeAuthorizedAlias: AugmentedSubmittable<(aliaser: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation]>;
      /**
       * Transfer some assets from the local chain to the destination chain through their local,
       * destination or remote reserve.
       * 
       * `assets` must have same reserve location and may not be teleportable to `dest`.
       * - `assets` have local reserve: transfer assets to sovereign account of destination
       * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
       * assets to `beneficiary`.
       * - `assets` have destination reserve: burn local assets and forward a notification to
       * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
       * deposit them to `beneficiary`.
       * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
       * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
       * to mint and deposit reserve-based assets to `beneficiary`.
       * 
       * **This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
       * with all fees taken as needed from the asset.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` (and possibly reserve) chains.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       **/
      reserveTransferAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, assets: XcmVersionedAssets | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32]>;
      send: AugmentedSubmittable<(dest: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, message: XcmVersionedXcm | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedXcm]>;
      /**
       * Teleport some assets from the local chain to some destination chain.
       * 
       * **This function is deprecated: Use `limited_teleport_assets` instead.**
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
       * with all fees taken as needed from the asset.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` chain.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       **/
      teleportAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, assets: XcmVersionedAssets | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32]>;
      /**
       * Transfer some assets from the local chain to the destination chain through their local,
       * destination or remote reserve, or through teleports.
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
       * `weight_limit` of weight. If more weight is needed than `weight_limit`, then the
       * operation will fail and the sent assets may be at risk.
       * 
       * `assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
       * to `dest`, no limitations imposed on `fees`.
       * - for local reserve: transfer assets to sovereign account of destination chain and
       * forward a notification XCM to `dest` to mint and deposit reserve-based assets to
       * `beneficiary`.
       * - for destination reserve: burn local assets and forward a notification to `dest` chain
       * to withdraw the reserve assets from this chain's sovereign account and deposit them
       * to `beneficiary`.
       * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
       * from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
       * and deposit reserve-based assets to `beneficiary`.
       * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
       * assets and deposit them to `beneficiary`.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `X2(Parent,
       * Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
       * from relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` (and possibly reserve) chains.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
       **/
      transferAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, assets: XcmVersionedAssets | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array, weightLimit: XcmV3WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32, XcmV3WeightLimit]>;
      /**
       * Transfer assets from the local chain to the destination chain using explicit transfer
       * types for assets and fees.
       * 
       * `assets` must have same reserve location or may be teleportable to `dest`. Caller must
       * provide the `assets_transfer_type` to be used for `assets`:
       * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
       * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
       * assets to `beneficiary`.
       * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
       * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
       * deposit them to `beneficiary`.
       * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
       * chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
       * XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
       * the remote `reserve` is Asset Hub.
       * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
       * mint/teleport assets and deposit them to `beneficiary`.
       * 
       * On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
       * buy execution using transferred `assets` identified by `remote_fees_id`.
       * Make sure enough of the specified `remote_fees_id` asset is included in the given list
       * of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
       * is needed than `weight_limit`, then the operation will fail and the sent assets may be
       * at risk.
       * 
       * `remote_fees_id` may use different transfer type than rest of `assets` and can be
       * specified through `fees_transfer_type`.
       * 
       * The caller needs to specify what should happen to the transferred assets once they reach
       * the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
       * contains the instructions to execute on `dest` as a final step.
       * This is usually as simple as:
       * `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
       * but could be something more exotic like sending the `assets` even further.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
       * parachain across a bridge to another ecosystem destination.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` (and possibly reserve) chains.
       * - `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
       * - `remote_fees_id`: One of the included `assets` to be used to pay fees.
       * - `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
       * - `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
       * transfer, which also determines what happens to the assets on the destination chain.
       * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
       **/
      transferAssetsUsingTypeAndThen: AugmentedSubmittable<(dest: XcmVersionedLocation | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, assets: XcmVersionedAssets | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, assetsTransferType: StagingXcmExecutorAssetTransferTransferType | { Teleport: any } | { LocalReserve: any } | { DestinationReserve: any } | { RemoteReserve: any } | string | Uint8Array, remoteFeesId: XcmVersionedAssetId | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, feesTransferType: StagingXcmExecutorAssetTransferTransferType | { Teleport: any } | { LocalReserve: any } | { DestinationReserve: any } | { RemoteReserve: any } | string | Uint8Array, customXcmOnDest: XcmVersionedXcm | { V3: any } | { V4: any } | { V5: any } | string | Uint8Array, weightLimit: XcmV3WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedAssets, StagingXcmExecutorAssetTransferTransferType, XcmVersionedAssetId, StagingXcmExecutorAssetTransferTransferType, XcmVersionedXcm, XcmV3WeightLimit]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    session: {
      /**
       * Removes any session key(s) of the function caller.
       * 
       * This doesn't take effect until the next session.
       * 
       * The dispatch origin of this function must be Signed and the account must be either be
       * convertible to a validator ID using the chain's typical addressing system (this usually
       * means being a controller account) or directly convertible into a validator ID (which
       * usually means being a stash account).
       * 
       * ## Complexity
       * - `O(1)` in number of key types. Actual cost depends on the number of length of
       * `T::Keys::key_ids()` which is fixed.
       **/
      purgeKeys: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Sets the session key(s) of the function caller to `keys`.
       * Allows an account to set its session key prior to becoming a validator.
       * This doesn't take effect until the next session.
       * 
       * The dispatch origin of this function must be signed.
       * 
       * ## Complexity
       * - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
       * fixed.
       **/
      setKeys: AugmentedSubmittable<(keys: ParachainTemplateRuntimeSessionKeys | { aura?: any } | string | Uint8Array, proof: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [ParachainTemplateRuntimeSessionKeys, Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * Permanently removes the sudo key.
       * 
       * **This cannot be un-done.**
       **/
      removeKey: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
       **/
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       **/
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * 
       * The dispatch origin for this call must be _Signed_.
       **/
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Signed_.
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
       * 
       * If the authorization required a version check, this call will ensure the spec name
       * remains unchanged and that the spec version has increased.
       * 
       * Depending on the runtime's `OnSetCode` configuration, this function may directly apply
       * the new `code` in the same block or attempt to schedule the upgrade.
       * 
       * All origins are allowed.
       **/
      applyAuthorizedUpgrade: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
       * later.
       * 
       * This call requires Root origin.
       **/
      authorizeUpgrade: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
       * later.
       * 
       * WARNING: This authorizes an upgrade that will take place without any safety checks, for
       * example that the spec name remains the same and that the version number increases. Not
       * recommended for normal use. Use `authorize_upgrade` instead.
       * 
       * This call requires Root origin.
       **/
      authorizeUpgradeWithoutChecks: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       * 
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * Make some on-chain remark.
       * 
       * Can be executed by every `origin`.
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code.
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       * 
       * Note that runtime upgrades will not run if this is called with a not-increasing spec
       * version!
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    templatePallet: {
      /**
       * An example dispatchable that may throw a custom error.
       **/
      causeError: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * An example dispatchable that takes a singles value as a parameter, writes the value to
       * storage and emits an event. This function must be dispatched by a signed extrinsic.
       **/
      doSomething: AugmentedSubmittable<(bn: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * Set the current time.
       * 
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * 
       * The timestamp should be greater than the previous one by the amount specified by
       * [`Config::MinimumPeriod`].
       * 
       * The dispatch origin for this call must be _None_.
       * 
       * This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
       * that changing the complexity of this call could result exhausting the resources in a
       * block to execute any other calls.
       * 
       * ## Complexity
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    utility: {
      /**
       * Send a call through an indexed pseudonym of the sender.
       * 
       * Filter from origin are passed along. The call will be dispatched with an origin which
       * use the same filter as the origin of this call.
       * 
       * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
       * because you expect `proxy` to have been used prior in the call stack and you do not want
       * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
       * in the Multisig pallet instead.
       * 
       * NOTE: Prior to version *12, this was called `as_limited_sub`.
       * 
       * The dispatch origin for this call must be _Signed_.
       **/
      asDerivative: AugmentedSubmittable<(index: u16 | AnyNumber | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Call]>;
      /**
       * Send a batch of dispatch calls.
       * 
       * May be called from any origin except `None`.
       * 
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       * 
       * If origin is root then the calls are dispatched without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       * 
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       * 
       * This will return `Ok` in all circumstances. To determine the success of the batch, an
       * event is deposited. If a call failed and the batch was interrupted, then the
       * `BatchInterrupted` event is deposited, along with the number of successful calls made
       * and the error of the failed call. If all were successful, then the `BatchCompleted`
       * event is deposited.
       **/
      batch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Send a batch of dispatch calls and atomically execute them.
       * The whole transaction will rollback and fail if any of the calls failed.
       * 
       * May be called from any origin except `None`.
       * 
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       * 
       * If origin is root then the calls are dispatched without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       * 
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       **/
      batchAll: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Dispatches a function call with a provided origin.
       * 
       * The dispatch origin for this call must be _Root_.
       * 
       * ## Complexity
       * - O(1).
       **/
      dispatchAs: AugmentedSubmittable<(asOrigin: ParachainTemplateRuntimeOriginCaller | { system: any } | { PolkadotXcm: any } | { CumulusXcm: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [ParachainTemplateRuntimeOriginCaller, Call]>;
      /**
       * Dispatches a function call with a provided origin.
       * 
       * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
       * 
       * The dispatch origin for this call must be _Root_.
       **/
      dispatchAsFallible: AugmentedSubmittable<(asOrigin: ParachainTemplateRuntimeOriginCaller | { system: any } | { PolkadotXcm: any } | { CumulusXcm: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [ParachainTemplateRuntimeOriginCaller, Call]>;
      /**
       * Send a batch of dispatch calls.
       * Unlike `batch`, it allows errors and won't interrupt.
       * 
       * May be called from any origin except `None`.
       * 
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       * 
       * If origin is root then the calls are dispatch without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       * 
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       **/
      forceBatch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Dispatch a fallback call in the event the main call fails to execute.
       * May be called from any origin except `None`.
       * 
       * This function first attempts to dispatch the `main` call.
       * If the `main` call fails, the `fallback` is attemted.
       * if the fallback is successfully dispatched, the weights of both calls
       * are accumulated and an event containing the main call error is deposited.
       * 
       * In the event of a fallback failure the whole call fails
       * with the weights returned.
       * 
       * - `main`: The main call to be dispatched. This is the primary action to execute.
       * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
       * 
       * ## Dispatch Logic
       * - If the origin is `root`, both the main and fallback calls are executed without
       * applying any origin filters.
       * - If the origin is not `root`, the origin filter is applied to both the `main` and
       * `fallback` calls.
       * 
       * ## Use Case
       * - Some use cases might involve submitting a `batch` type call in either main, fallback
       * or both.
       **/
      ifElse: AugmentedSubmittable<(main: Call | IMethod | string | Uint8Array, fallback: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, Call]>;
      /**
       * Dispatch a function call with a specified weight.
       * 
       * This function does not check the weight of the call, and instead allows the
       * Root origin to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Root_.
       **/
      withWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    xcmpQueue: {
      /**
       * Resumes all XCM executions for the XCMP queue.
       * 
       * Note that this function doesn't change the status of the in/out bound channels.
       * 
       * - `origin`: Must pass `ControllerOrigin`.
       **/
      resumeXcmExecution: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Suspends all XCM executions for the XCMP queue, regardless of the sender's origin.
       * 
       * - `origin`: Must pass `ControllerOrigin`.
       **/
      suspendXcmExecution: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Overwrites the number of pages which must be in the queue after which we drop any
       * further messages from the channel.
       * 
       * - `origin`: Must pass `Root`.
       * - `new`: Desired value for `QueueConfigData.drop_threshold`
       **/
      updateDropThreshold: AugmentedSubmittable<(updated: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Overwrites the number of pages which the queue must be reduced to before it signals
       * that message sending may recommence after it has been suspended.
       * 
       * - `origin`: Must pass `Root`.
       * - `new`: Desired value for `QueueConfigData.resume_threshold`
       **/
      updateResumeThreshold: AugmentedSubmittable<(updated: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Overwrites the number of pages which must be in the queue for the other side to be
       * told to suspend their sending.
       * 
       * - `origin`: Must pass `Root`.
       * - `new`: Desired value for `QueueConfigData.suspend_value`
       **/
      updateSuspendThreshold: AugmentedSubmittable<(updated: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
