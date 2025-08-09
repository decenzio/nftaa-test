<template>
  <div class="container mx-auto p-6 space-y-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-2">NFTAA Test Interface</h1>
      <p class="text-gray-600">
        Test interface for Polkadot.js integration with NFTAA pallet
      </p>
    </div>

    <!-- Instructions -->
    <UCard class="max-w-4xl mx-auto">
      <template #header>
        <h3 class="text-lg font-semibold">Instructions</h3>
      </template>

      <div class="space-y-4 text-sm">
        <div>
          <h4 class="font-medium">Setup:</h4>
          <ol class="list-decimal list-inside space-y-1 text-gray-600 ml-4">
            <li>
              Make sure your local Substrate node is running on
              <code class="bg-gray-100 px-1 rounded">ws://127.0.0.1:9920</code>
            </li>
            <li>Install and setup Polkadot.js browser extension</li>
            <li>
              Click the "Connect" button in the top navigation to connect to the
              node and wallet
            </li>
          </ol>
        </div>

        <div>
          <h4 class="font-medium">Usage:</h4>
          <ol class="list-decimal list-inside space-y-1 text-gray-600 ml-4">
            <li>
              First, create a new collection using the "Create Collection" card
            </li>
            <li>
              Then, mint NFTs in that collection using the "Create NFT" card
            </li>
            <li>
              Toggle "Use NFTAA Pallet" to switch between
              <code class="bg-gray-100 px-1 rounded">nfts</code> and
              <code class="bg-gray-100 px-1 rounded">nftaa</code> pallets
            </li>
            <li>
              Metadata will be automatically set via batch transaction when
              provided
            </li>
          </ol>
        </div>
      </div>
    </UCard>

    <!-- Main Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-4">
      <!-- Create Collection Card -->
      <CreateCollection />

      <!-- Create NFT Card -->
      <CreateNFT />
    </div>
  </div>
</template>
