# NFTAA Test

PoC for NFTAA using Nuxt 4 and Polkadot.js

## Generate types

```bash
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9920 > edgeware.json
```

```bash
pnpm generate:types
```
