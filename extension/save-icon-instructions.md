# How to Add the Cool Bug Icon

1. Save the blue/purple glowing bug image as `icon.png` in the extension folder
2. Make sure it's 128x128 pixels or larger
3. The file should be at: `C:\Users\HP\BugSight\extension\icon.png`

Then repackage:
```bash
cd extension
vsce package --no-dependencies --allow-missing-repository
```

The icon will appear in the VSCode marketplace and extension details!
