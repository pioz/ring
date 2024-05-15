# Ring

Record video to file from a Ring cam

## Usage

Get the refresh token with:

```bash
npm run auth
```

Start record to file:

```bash
RING_REFRESH_TOKEN=xxx node . -o record.mp4 -s 10
```
